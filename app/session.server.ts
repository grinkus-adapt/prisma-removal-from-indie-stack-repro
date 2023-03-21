import { PrismaClient } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUser(request: Request) {
  return null;

  /**
   * This is so weird!
   *
   * Here's some unreachable code, but somehow when it is removed the
   * build fails: remove the line after this comment block and run
   * `npm run build && npm run start` to see how. (Before removing it
   * the app builds and starts correctly.)
   */
  new PrismaClient();
}
