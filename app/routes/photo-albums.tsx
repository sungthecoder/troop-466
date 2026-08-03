import type {
  LoaderFunction,
  LoaderFunctionArgs,
} from "@netlify/remix-runtime";
import { redirect, useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { getSheetAsJson } from "~/lib/get-google-sheet";
import { PHOTO_ALBUM_SPREADSHEET_ID } from "~/lib/constants";
import { canAccess } from "~/lib/session.server";

interface Album {
  date: string;
  title: string;
  shortDescription: string;
  googleAlbumUrl: string;
  thumbnailUrl: string;
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const access = await canAccess(request);

  const sheetRange = "Sheet1!A1:E";
  const albums = (await getSheetAsJson(
    PHOTO_ALBUM_SPREADSHEET_ID,
    sheetRange
  )) as unknown as Album[];

  return access ? { albums } : redirect("/403");
};

export default function Page() {
  const { albums } = useLoaderData<typeof loader>();

  return (
    <>
      <NavBar />
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
            <div className="mx-auto flex max-w-7xl flex-row flex-wrap px-4">
              {albums.map((album: Album) => {
                const albumDate = new Date(album.date);
                const month = albumDate.toLocaleDateString("en-US", {
                  month: "short",
                });
                const year = albumDate.toLocaleDateString("en-US", {
                  year: "numeric",
                });

                return (
                  <div
                    key={album.googleAlbumUrl}
                    className="items-stretch w-full p-2 lg:w-1/2 xl:w-1/3"
                  >
                    <article className="card card-compact h-full w-auto bg-base-100 shadow-xl">
                      <a
                        href={album.googleAlbumUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View ${album.title} photo album`}
                      >
                        <figure>
                          <img
                            className="h-52 min-w-full rounded-md object-cover"
                            src={
                              album.thumbnailUrl ||
                              "/assets/image/album-fallback.jpg"
                            }
                            alt={`Thumbnail for ${album.title}`}
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src =
                                "/assets/image/album-fallback.jpg";
                            }}
                          />
                        </figure>
                      </a>
                      <div className="flex flex-grow flex-row">
                        <div className="mx-4 flex w-16 min-w-16 max-w-16 flex-grow-0 flex-col justify-start p-4 text-center">
                          <div className="text-sm font-bold uppercase text-troop466-400">
                            {month}
                          </div>
                          <div className="mt-2 text-xl font-bold text-gray-900">
                            {year}
                          </div>
                        </div>
                        <div className="card-body grow">
                          <h2
                            className="card-title overflow-hidden text-ellipsis whitespace-normal line-clamp-1 break-all"
                            title={album.title}
                          >
                            {album.title}
                          </h2>
                          <p className="line-clamp-3 break-all">
                            {album.shortDescription}
                          </p>
                          <div className="card-actions justify-end">
                            <a
                              href={album.googleAlbumUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="btn btn-primary text-white visited:text-white visited:hover:text-gray-900"
                            >
                              View Album
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
