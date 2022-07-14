import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// Authenticator
import {
  authenticator,
  sessionStorage,
  supabaseStrategy,
} from "app/auth.server";

import { supabaseClient } from "./supabase";

import styles from "./tailwind.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export const loader = async ({request}) => {
// If user is logged in, get user id
const session = await sessionStorage.getSession(
  request.headers.get("Cookie")
)
const userId= await session.get(authenticator.sessionKey)?.user?.id

if (session && userId) {
  return json({
    userId,
  });
}

return json({
  userId
})



};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

