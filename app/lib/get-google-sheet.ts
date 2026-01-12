import { google } from "googleapis";
import { env } from "node:process";
import camelcase from "camelcase";

type SheetCell = string | number | boolean | null;
type SheetRow = SheetCell[];

const CREDENTIALS = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY || "");
const clientEmail = CREDENTIALS.client_email;
const privateKey = CREDENTIALS.private_key.split(String.raw`\n`).join("\n");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const auth = new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
const sheets = google.sheets({ version: "v4", auth });

export async function getSheetAsJson(spreadsheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const values = (response.data.values || []) as SheetRow[];
    const [headerRow, ...dataRows] = values;
    if (!headerRow) {
      return [];
    }

    return dataRows.map((row) => {
      const entry: Record<string, SheetCell> = {};
      headerRow.forEach((key, index) => {
        if (typeof key === "string" && key.trim() !== "") {
          const camelKey = camelcase(key);
          if (camelKey) {
            entry[camelKey] = row?.[index] ?? null;
          }
        }
      });
      return entry;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
