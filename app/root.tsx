import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import tailwindStyles from "~/tailwind.css?url";
import rootStyles from "~/styles.scss?url";
import { getCurrentUser } from "./lib/session.server";
import { getMenu } from "./lib/get-menu";

fontAwesomeConfig.autoAddCss = false;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: rootStyles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getCurrentUser(request);
  const menu = getMenu(Boolean(user));
  return { user, menu };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
