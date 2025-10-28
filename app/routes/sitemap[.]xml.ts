import type { LoaderFunctionArgs } from "@netlify/remix-runtime";
import { isValid } from "~/lib/get-google-doc-page";
import googleDocs from "~/../contents/google-docs.yml";
import fs from "node:fs/promises";
import path from "node:path";

interface SitemapItem {
  path: string;
  lastmod?: string | null;
}

const STATIC_PATHS = ["/", "/eagle-projects"];

const pagesDirectory = path.join(process.cwd(), "contents", "pages");

const escapeXml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const buildXml = (origin: string, items: SitemapItem[]) => {
  const urls = items
    .map(({ path: urlPath, lastmod }) => {
      const loc = `${origin}${urlPath}`;
      const escapedLoc = escapeXml(loc);
      const lastmodTag =
        lastmod != null ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapedLoc}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const getMarkdownPages = async (): Promise<SitemapItem[]> => {
  try {
    const files = await fs.readdir(pagesDirectory);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    const pages = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        try {
          const module = (await import(
            `../../contents/pages/${slug}.md`
          )) as { attributes?: { date?: string | null } };
          const lastmod =
            typeof module?.attributes?.date === "string"
              ? new Date(module.attributes.date).toISOString()
              : null;

          return {
            path: `/${slug}`,
            lastmod,
          };
        } catch {
          return { path: `/${slug}` };
        }
      })
    );

    return pages;
  } catch {
    return [];
  }
};

const getGoogleDocPages = (): SitemapItem[] => {
  if (!isValid(googleDocs)) {
    return [];
  }

  return googleDocs.docs.map(({ slug }) => ({
    path: `/${slug}`,
  }));
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const origin = new URL(request.url).origin;

  const markdownPages = await getMarkdownPages();
  const googleDocPages = getGoogleDocPages();

  const uniquePaths = new Map<string, SitemapItem>();
  const addItem = (item: SitemapItem) => {
    const existing = uniquePaths.get(item.path);
    if (!existing) {
      uniquePaths.set(item.path, item);
      return;
    }
    if (!existing.lastmod && item.lastmod) {
      uniquePaths.set(item.path, item);
    }
  };

  [...STATIC_PATHS.map((path) => ({ path })), ...markdownPages, ...googleDocPages]
    .sort((a, b) => a.path.localeCompare(b.path))
    .forEach(addItem);

  const sitemap = buildXml(origin, Array.from(uniquePaths.values()));

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
