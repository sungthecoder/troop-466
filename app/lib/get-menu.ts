import invariant from "tiny-invariant";
import gDoc from "~/../contents/google-docs.yml";
import { isValid } from "./get-google-doc-page";

export const getMenu = (loggedIn: boolean = false) => {
  invariant(isValid(gDoc), "google-docs.yml has bad metadata");
  return [
    {
      label: "Home page",
      to: "/",
      memberOnly: false,
    },
    {
      label: "Photo Albums",
      to: "/photo-albums",
      memberOnly: true,
    },
    {
      label: "Eagle scout projects",
      to: "/eagle-projects",
      memberOnly: false,
    },
    ...gDoc.docs.map(({ title, slug, memberOnly }) => ({
      label: title,
      to: `/${slug}`,
      memberOnly,
    })),
  ].filter(({ memberOnly }) => (loggedIn ? true : !memberOnly));
};
