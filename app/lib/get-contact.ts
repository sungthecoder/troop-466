import invariant from "tiny-invariant";
import doc from "~/../contents/contact.yml";

export interface ContactUsProps {
  email: string;
  web3formAccessKey: string;
  address: string;
  website: string;
}

const isValid = (attributes: any): attributes is ContactUsProps => {
  return (
    attributes?.email &&
    attributes?.web3formAccessKey &&
    attributes?.address &&
    attributes?.website
  );
};

export async function getContact() {
  invariant(isValid(doc), "contact yml has bad metadata");
  return doc;
}
