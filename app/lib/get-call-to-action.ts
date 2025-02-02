import invariant from "tiny-invariant";
import doc from "~/../contents/cta.yml";

export type FAQItem = {
  question: string;
  answer: string;
};

export interface CallToActionProps {
  heading: string;
  message: string;
  url: string;
  faqs: Array<FAQItem>;
}

const isValid = (attributes: any): attributes is CallToActionProps => {
  return (
    attributes?.heading &&
    attributes?.message &&
    attributes?.url &&
    Array.isArray(attributes?.faqs)
  );
};

export function getCallToAction() {
  invariant(isValid(doc), "call to action yml has bad metadata");
  return doc;
}
