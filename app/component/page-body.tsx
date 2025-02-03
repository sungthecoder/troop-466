import { type MarkdownPage } from "~/lib/get-md-page";

export const PageBody = ({ title, date, html }: MarkdownPage) => {
  const publishedAt = date
    ? new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <section className="hero h-80 bg-[url('/assets/image/background-page-hero.jpg')] text-slate-50">
        <div className="flex flex-col gap-7 text-center">
          <h1 className="text-4xl font-bold font-serif uppercase">{title}</h1>
          <h6 className="text-md font-serif uppercase">{publishedAt}</h6>
        </div>
      </section>
      <section className="bg-repeat bg-[url('/assets/image/topographic-map-background.jpg')] py-24">
        <div className="bg-white p-24 max-w-fit mx-auto rounded-xl">
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </>
  );
};
