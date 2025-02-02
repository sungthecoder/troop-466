import showdown from "showdown";
import invariant from "tiny-invariant";
import doc from "~/../contents/cta.yml";

export type FAQItem = {
  question: string;
  answer: string;
};

export interface CallToAction {
  heading: string;
  message: string;
  url: string;
  faqs: Array<FAQItem>;
}

const isValid = (attributes: any): attributes is CallToAction => {
  return (
    attributes?.heading &&
    attributes?.message &&
    attributes?.url &&
    Array.isArray(attributes?.faqs)
  );
};

export function getCallToAction() {
  invariant(isValid(doc), "call to action yml has bad metadata");
  const converter = new showdown.Converter();
  const { message } = doc;
  return {
    ...doc,
    messageHtml: converter.makeHtml(message),
  };
}

export type CallToActionProps = ReturnType<typeof getCallToAction>;
