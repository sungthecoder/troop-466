// app/services/session.server.ts
import { env } from "node:process";
import { createCookieSessionStorage } from "@remix-run/node";
import { type User } from "./auth.type";
import { getMenu } from "./get-menu";

export const sessionStorage = createCookieSessionStorage<{ user: User }>({
  cookie: {
    name: "session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [env.SESSION_SECRET || ""], // replace this with an actual secret
    secure: env.NODE_ENV === "production", // enable this in prod only
  },
});

const { getSession, commitSession, destroySession } = sessionStorage;

const getCurrentUser = async (request: Request) => {
  const {
    data: { user },
  } = await getSession(request.headers.get("Cookie"));

  return user;
};

export const canAccess = async (request: Request) => {
  const currentPath = new URL(request.url).pathname;
  const loggedIn = Boolean(await getCurrentUser(request));
  const menu = getMenu(true);
  const selectedMenuItem = menu.find(({ to }) => to === currentPath);

  return loggedIn || !selectedMenuItem?.memberOnly;
};

export { getSession, commitSession, destroySession, getCurrentUser };
