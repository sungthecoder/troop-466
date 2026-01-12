import type { LoaderFunction } from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/component/footer";
import { NavBar } from "~/component/nav-bar";
import { getMenu } from "~/lib/get-menu";
import { getSheetAsJson } from "~/lib/get-google-sheet";
import { PHOTO_ALBUM_SPREADSHEET_ID } from "~/lib/constants";

interface Album {
  date: string;
  title: string;
  shortDescription: string;
  googleAlbumUrl: string;
}

export const loader: LoaderFunction = async () => {
  const menu = getMenu();
  const sheetRange = "Sheet1!A1:D";
  const albums = (await getSheetAsJson(
    PHOTO_ALBUM_SPREADSHEET_ID,
    sheetRange
  )) as unknown as Album[];

  return { menu, albums };
};

export default function Page() {
  const { menu, albums } = useLoaderData<typeof loader>();

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
            <div className="mx-auto max-w-4xl px-6 text-slate-900">
              <div className="overflow-x-auto rounded bg-white/90">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Activity</th>
                      <th className="px-4 py-3 font-semibold">
                        Short Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((album: Album) => (
                      <tr
                        key={`${album.googleAlbumUrl}`}
                        className="border-b border-slate-200 last:border-0"
                      >
                        <td className="px-4 py-3">
                          {new Date(album.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <a
                            className="text-blue-700 underline"
                            href={album.googleAlbumUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {album.title}
                          </a>
                        </td>
                        <td className="px-4 py-3">{album.shortDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
