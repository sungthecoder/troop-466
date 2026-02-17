import { google } from "googleapis";
import { env } from "node:process";

const SHARED_GOOGLE_FOLDER_ID = env.SHARED_GOOGLE_FOLDER_ID || "";
const CREDENTIALS = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY || "");
const clientEmail = CREDENTIALS.client_email;
const privateKey = CREDENTIALS.private_key.split(String.raw`\n`).join("\n");
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const auth = new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
const gdrive = google.drive({ version: "v3", auth });

// find a membership from googld drive Troop 466 - Scouts and Adults shared user list
// e.g. permission list of `Troop 466 - Scouts and Adults`
export const isMember = async (email: string) => {
  if (SHARED_GOOGLE_FOLDER_ID === "") {
    console.error("SHARED-FOLDER-ID is not defined");
    return false;
  }

  try {
    const { data } = await gdrive.permissions.list({
      fileId: SHARED_GOOGLE_FOLDER_ID,
      fields: "permissions",
      supportsAllDrives: true,
    });
    return Boolean(
      data.permissions?.some((permission) => permission.emailAddress === email)
    );
  } catch (error) {
    console.error({ error });
  }
  return false;
};
