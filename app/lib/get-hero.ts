import showdown from "showdown";
import invariant from "tiny-invariant";
import doc from "~/../contents/hero.yml";

export interface HeroContent {
  greeting: string;
  message: string;
}

const isValid = (attributes: any): attributes is HeroContent => {
  return attributes?.greeting && attributes?.message;
};

export function getHero() {
  invariant(isValid(doc), "hero yml has bad metadata");
  const { message } = doc;
  const converter = new showdown.Converter();
  return {
    ...doc,
    html: converter.makeHtml(message),
  };
}
