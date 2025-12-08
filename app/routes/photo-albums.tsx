import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { FileCard } from "~/component/file-card";
import { SHARED_DRIVE_ID, EAGLE_PROJECTS_FOLDER_ID } from "~/lib/constants";
import { getAllFiles } from "~/lib/get-files-in-google-drive-folder";
import { getMenu } from "~/lib/get-menu";
import { drive_v3 } from "googleapis";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const menu = getMenu();

  return { menu };
};

export default function Page() {
  const { menu } = useLoaderData<typeof loader>();

  return (
    <>
      <NavBar menu={menu} />
      <div id="top" className="page">
        <main>
          <section className="hero h-80 bg-[url('/assets/image/background-page-hero.jpg')] text-slate-50">
            <div className="flex flex-col gap-7 text-center">
              <h1 className="text-4xl font-bold font-serif uppercase">
                Photo Albums
              </h1>
            </div>
          </section>
          <section className="bg-repeat bg-[url('/assets/image/topographic-map-background.jpg')] py-24">
            <div className="mb-10 flex flex-row flex-wrap m-4"></div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
