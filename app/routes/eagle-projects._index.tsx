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
import { drive_v3 } from "googleapis";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageToken = url.searchParams.get("pageToken");

  const { nextPageToken, files: allFiles } = await getAllFiles(
    EAGLE_PROJECTS_FOLDER_ID,
    SHARED_DRIVE_ID,
    { pageToken }
  );

  const files = allFiles
    .filter(({ kind }) => kind === "drive#file")
    .filter(({ name }) => name !== "README");

  return { files, nextPageToken };
};

export default function Page() {
  const { files } = useLoaderData<typeof loader>();

  return (
    <>
      <NavBar />
      <div id="top" className="page">
        <main>
          <section className="hero h-80 bg-[url('/assets/image/eagle.jpg')] text-slate-50">
            <div className="flex flex-col gap-7 text-center">
              <h1 className="text-4xl font-bold font-serif uppercase">
                Eagle Scout Projects
              </h1>
            </div>
          </section>
          <section className="bg-repeat bg-[url('/assets/image/topographic-map-background.jpg')] py-24">
            <div className="mb-10 flex flex-row flex-wrap m-4">
              {files.map((file: drive_v3.Schema$File) => (
                <div
                  key={file.id}
                  className="items-stretch w-full lg:w-1/2 xl:w-1/3 p-2"
                >
                  <FileCard file={file} linkTo={`./${file.id}`} />
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
