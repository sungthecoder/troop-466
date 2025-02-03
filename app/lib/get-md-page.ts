import invariant from "tiny-invariant";
import showdown from "showdown";
import { isDate } from "./is-date";

export interface PageFrontmatter {
  layout: "page";
  title: string;
  date: string;
}

const isValid = (attributes: any): attributes is PageFrontmatter => {
  return (
    attributes?.layout === "page" &&
    attributes?.title &&
    isDate(attributes?.date)
  );
};

export async function getMarkdownPage(pageName: string) {
  try {
    const { attributes, markdown } = await import(
      `../../contents/pages/${pageName}.md`
    );
    invariant(isValid(attributes), `${pageName}.md has bad meta data!`);
    const converter = new showdown.Converter();

    return {
      ...attributes,
      html: converter.makeHtml(markdown),
    };
  } catch {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export type MarkdownPage = Omit<
  Awaited<ReturnType<typeof getMarkdownPage>>,
  "layout"
>;
