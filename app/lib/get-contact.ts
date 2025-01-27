import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import yaml from "js-yaml";
import path from "path";
import invariant from "tiny-invariant";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ContactUsProps {
  email: string;
  web3formAccessKey: string;
  address: string;
  website: string;
}

const contactPath = path.join(__dirname, "../..", "/contents/contact.yml");

const isValid = (attributes: any): attributes is ContactUsProps => {
  return (
    attributes?.email &&
    attributes?.web3formAccessKey &&
    attributes?.address &&
    attributes?.website
  );
};

export async function getContact() {
  const file = await fs.readFile(contactPath);
  const doc = yaml.load(file.toString()) as ContactUsProps;
  invariant(isValid(doc), "contact yml has bad metadata");
  return doc;
}
