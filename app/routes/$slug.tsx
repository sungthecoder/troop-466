import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { redirect, useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { PageBody } from "~/component/page-body";
import { getGoogleDocPage } from "~/lib/get-google-doc-page";
import { getMarkdownPage } from "~/lib/get-md-page";
import { getMenu } from "~/lib/get-menu";
import { canAccess } from "~/lib/session.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const access = await canAccess(request);
  const pageName = params.slug || "";
  const gdPage = await getGoogleDocPage(pageName);
  const menu = getMenu();
  const page = gdPage || (await getMarkdownPage(pageName));

  return access ? { menu, page } : redirect("/403");
};

export default function Page() {
  const { page } = useLoaderData<typeof loader>();
  const { title, date, html } = page;

  return (
    <>
      <NavBar />
      <div id="top" className="page">
        <main>
          <PageBody title={title} date={date} html={html} />
        </main>
        <Footer />
      </div>
    </>
  );
}
