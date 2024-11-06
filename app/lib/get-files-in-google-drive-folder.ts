import { drive_v3, google } from "googleapis";
import { JWT } from "google-auth-library";
import { env } from "node:process";
import { Buffer } from "buffer";

export const isFolder = (mimeType?: string | null) =>
  mimeType?.endsWith("folder");

const CREDENTIALS = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY || "");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const gdrive = google.drive({ version: "v3" });

const clientEmail = CREDENTIALS.client_email;
const privateKey = CREDENTIALS.private_key.split(String.raw`\n`).join("\n");
const auth = new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
const fileFields = [
  "id",
  "name",
  "parents",
  "description",
  "webContentLink",
  "webViewLink",
  "mimeType",
  "iconLink",
  "hasThumbnail",
  "thumbnailLink",
];

export async function fetchThumbnail(
  link: string,
  jwt: JWT,
  thumbnailSize = 320
) {
  const requestHeaders = await jwt.getRequestHeaders();
  const linkWithThumbnailSize = link.replace(/=s[0-9]+$/, `=s${thumbnailSize}`);
  return await fetch(linkWithThumbnailSize, requestHeaders).then(
    async (response) => {
      const contentType = response.ok && response.headers.get("Content-Type");
      if (contentType?.toString().startsWith("image")) {
        const blob = await response.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        const base64 = buffer.toString("base64");
        return `data:${contentType};base64,${base64}`;
      } else {
        return link;
      }
    }
  );
}

export const getAllFiles = async (
  folderId: string,
  option: { pageToken?: string | null; thumbnailSize?: number } = {}
) => {
  try {
    const response = await gdrive.files.list({
      auth,
      q: `'${folderId}' in parents`,
      fields: `nextPageToken, files(${fileFields.join(",")})`,
      pageToken: option?.pageToken || undefined,
    });

    const folders = (response.data.files || [])
      .filter((file) => isFolder(file.mimeType))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    const files = (response.data.files || [])
      .filter((file) => !isFolder(file.mimeType))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    const promises: Promise<drive_v3.Schema$File>[] = [];
    for (const file of [...folders, ...files]) {
      if (file.thumbnailLink) {
        promises.push(
          fetchThumbnail(file.thumbnailLink || "", auth, option.thumbnailSize)
            .then(async (image) => {
              if (image) {
                file.thumbnailLink = image;
              }
              return file;
            })
            .catch((error) => {
              file.thumbnailLink = "";
              console.error({ error });
              return file;
            })
        );
      } else {
        promises.push(new Promise((resolve) => resolve(file)));
      }
    }
    const updatedFiles = await Promise.all(promises);
    return { ...response.data, files: updatedFiles };
  } catch (error) {
    console.error(error);
    return { files: [] };
  }
};

export const getFile = async (fileId: string) => {
  try {
    const response = await gdrive.files.get({
      fileId,
      auth,
      fields: fileFields.join(","),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
