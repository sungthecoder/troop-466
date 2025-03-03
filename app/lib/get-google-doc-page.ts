import invariant from "tiny-invariant";
import showdown from "showdown";
import { docs_v1, google } from "googleapis";
import { env } from "node:process";
import doc from "~/../contents/google-docs.yml";

const CREDENTIALS = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY || "");
const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/documents.readonly",
];
const clientEmail = CREDENTIALS.client_email;
const privateKey = CREDENTIALS.private_key.split(String.raw`\n`).join("\n");
const auth = new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);

const gdrive = google.drive({ version: "v3" });
const gdoc = google.docs({ version: "v1", auth });

const getGoogldDoc = async (
  id: string
): Promise<{ markdown: string; document: docs_v1.Schema$Document }> => {
  const { data: markdown } = await gdrive.files.export({
    fileId: id,
    auth,
    mimeType: "text/markdown",
  });

  const { data: document } = await gdoc.documents.get({ documentId: id });
  return { markdown, document } as {
    markdown: string;
    document: docs_v1.Schema$Document;
  };
};

interface GoogleDocMeta {
  id: string;
  title: string;
  slug: string;
  category?: string;
}

export const isValid = (
  attributes: any
): attributes is { docs: GoogleDocMeta[] } => {
  return (
    attributes?.docs &&
    Array.isArray(attributes.docs) &&
    (attributes.docs as Array<GoogleDocMeta>).every(
      (meta) => meta.id && meta.title && meta.slug
    )
  );
};

const getGoogleDocList = () => {
  invariant(isValid(doc), "google-docs.yml has bad metadata");
  return doc.docs;
};

export async function getGoogleDocPage(slug: string) {
  const googleDocMetaList = getGoogleDocList();
  const googleDocMeta = googleDocMetaList.find((meta) => meta.slug === slug);

  if (!googleDocMeta) {
    return null;
  }
  const { id } = googleDocMeta;
  try {
    const converter = new showdown.Converter();
    const { markdown, document } = await getGoogldDoc(id);

    return {
      title: document.title,
      html: converter.makeHtml(markdown),
      date: null,
    };
  } catch (error) {
    console.log({ error });
    throw new Response(null, {
      status: 500,
      statusText: `Error: ${error}`,
    });
  }
}
