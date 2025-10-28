import invariant from "tiny-invariant";
import gDoc from "~/../contents/google-docs.yml";
import { isValid } from "./get-google-doc-page";

export const getMenu = () => {
  invariant(isValid(gDoc), "google-docs.yml has bad metadata");
  return [
    {
      label: "Home page",
      to: "/",
    },
    {
      label: "Eagle scout projects",
      to: "/eagle-projects",
    },
    ...gDoc.docs.map(({ title, slug }) => ({
      label: title,
      to: `/${slug}`,
    })),
  ];
};
