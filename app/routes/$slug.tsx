import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/NavBar";
import { PageBody } from "~/component/page-body";
import { getGoogleDocPage } from "~/lib/get-google-doc-page";
import { getMarkdownPage } from "~/lib/get-md-page";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const pageName = params.slug || "";
  const gdPage = await getGoogleDocPage(pageName);
  const page = gdPage || (await getMarkdownPage(pageName));

  return { page };
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
