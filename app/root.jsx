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

// Get all shows
const { data: allshows, error } = await supabaseClient.from("Shows").select();

// Get Tv shows
const { data: tvshows } = await supabaseClient.from("Shows").select().filter("category", "eq", "TV Series");

 // Get Movies shows
 const { data: movies } = await supabaseClient
 .from("Shows")
 .select()
 .eq("category", "Movie");

  // Get all Bookmarked shows
  const { data } = await supabaseClient
    .from("userfavoriteshows")
    .select("shows_id, Shows(*)")
    .eq("user_id", userId);

    const bookmarkedShows = data.map(({ Shows }) => {
      return Shows;
    });
/*
if (!session && userId) {
  return json({
    userId,
  });
}

*/
return json({
  userId,
  allshows,
  movies,
  tvshows,
  bookmarkedShows,
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

