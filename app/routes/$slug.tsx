import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { PageBody } from "~/component/page-body";
import { getGoogleDocPage } from "~/lib/get-google-doc-page";
import { getMarkdownPage } from "~/lib/get-md-page";
import { getMenu } from "~/lib/get-menu";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const pageName = params.slug || "";
  const gdPage = await getGoogleDocPage(pageName);
  const menu = getMenu();
  const page = gdPage || (await getMarkdownPage(pageName));

  return { menu, page };
};

export default function Page() {
  const { menu, page } = useLoaderData<typeof loader>();
  const { title, date, html } = page;

  return (
    <>
      <NavBar menu={menu} />
      <div id="top" className="page">
        <main>
          <PageBody title={title} date={date} html={html} />
        </main>
        <Footer />
      </div>
    </>
  );
}
