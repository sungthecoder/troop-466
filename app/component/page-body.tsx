import { ReactElement } from "react";
import { type MarkdownPage } from "~/lib/get-md-page";

export const PageBody = ({
  bannerUrl,
  breadcrumb,
  title,
  date,
  html,
}: MarkdownPage & { bannerUrl?: string; breadcrumb?: ReactElement }) => {
  const publishedAt = date
    ? new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const backgroundImgUrl =
    bannerUrl || "/assets/image/background-page-hero.jpg";

  return (
    <>
      <section
        className={`hero h-80 bg-[url('${backgroundImgUrl}')] text-slate-50`}
      >
        <div className="flex flex-col gap-7 text-center">
          <h1 className="text-4xl font-bold font-serif uppercase">{title}</h1>
          <h6 className="text-md font-serif uppercase">{publishedAt}</h6>
        </div>
      </section>
      <section className="bg-repeat bg-[url('/assets/image/topographic-map-background.jpg')] py-24">
        {breadcrumb ? (
          <div className="max-w-fit mx-auto breadcrumbs">{breadcrumb}</div>
        ) : null}
        <div className="bg-white p-24 max-w-fit mx-auto rounded-xl">
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {breadcrumb ? (
          <div className="max-w-fit mx-auto breadcrumbs">{breadcrumb}</div>
        ) : null}
      </section>
    </>
  );
};
