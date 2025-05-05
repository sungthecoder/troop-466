import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { PageBody } from "~/component/page-body";
import { getGoogleDocConttent } from "~/lib/get-google-doc-page";
import { getMenu } from "~/lib/get-menu";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const fileId = params.fileId || "";
  const page = await getGoogleDocConttent(fileId);
  const menu = getMenu();

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
          <PageBody
            title={title}
            date={date}
            html={html}
            bannerUrl="/assets/image/eagle.jpg"
            breadcrumb={
              <ul>
                <li>
                  <Link to="/eagle-projects">Eagle scout projects</Link>
                </li>
                <li>{title}</li>
              </ul>
            }
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
