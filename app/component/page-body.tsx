import { ReactElement, cloneElement } from "react";
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

  const breadcrumbTop = breadcrumb
    ? cloneElement(breadcrumb, { key: "breadcrumb-top" })
    : null;
  const breadcrumbBottom = breadcrumb
    ? cloneElement(breadcrumb, { key: "breadcrumb-bottom" })
    : null;

  return (
    <>
      <section
        className={`hero h-80 text-slate-50`}
        style={{ backgroundImage: `url(${backgroundImgUrl})` }}
      >
        <div className="flex flex-col gap-7 text-center">
          <h1 className="text-4xl font-bold font-serif uppercase">{title}</h1>
          <h6 className="text-md font-serif uppercase">{publishedAt}</h6>
        </div>
      </section>
      <section className="bg-repeat bg-[url('/assets/image/topographic-map-background.jpg')] py-24">
        {breadcrumbTop ? (
          <div className="max-w-fit mx-auto breadcrumbs">{breadcrumbTop}</div>
        ) : null}
        <div className="bg-white p-24 max-w-fit mx-auto rounded-xl">
          <article
            className="prose break-words"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {breadcrumbBottom ? (
          <div className="max-w-fit mx-auto breadcrumbs">
            {breadcrumbBottom}
          </div>
        ) : null}
      </section>
    </>
  );
};
