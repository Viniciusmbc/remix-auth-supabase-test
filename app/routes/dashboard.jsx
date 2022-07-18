// Components
import Navbar from "components/Navbar";

// Remix tools
import {  Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";

// Supabase Strategy
import { authenticator,
  sessionStorage,
  supabaseStrategy, } from "../auth.server";

  // Supabase
import { supabaseClient } from "app/supabase";

// Bookmarked shows fuction
import {getBookmarkedShows } from "../../utils/shows.server"

export const loader = async ({ request }) => {
 await supabaseStrategy.checkSession(request, {
    failureRedirect: "/login",
  });

  // Get user id
  const sessionActually = await sessionStorage.getSession(
    request.headers.get("Cookie")
  )
  const userId = await sessionActually.get(authenticator.sessionKey)?.user?.id
  
  // Get all shows
  const { data: allshows, error } = await supabaseClient.from("Shows").select();
  
  // Get Tv shows
  const { data: tvshows } = await supabaseClient.from("Shows").select().filter("category", "eq", "TV Series");
  
   // Get Movies shows
   const { data: movies } = await supabaseClient
   .from("Shows")
   .select()
   .eq("category", "Movie");
  
   const { data } = await supabaseClient
.from("userfavoriteshows")
.select("shows_id, Shows(*)")
.eq("user_id", userId);

const bookmarkedShows = data?.map(({ Shows }) => {
  return Shows;
});

  if (error) {
    return json({
      error,
    });
  }
  
  
  return json({
    userId,
    allshows,
    movies,
    tvshows,
    bookmarkedShows,
  })
  
};


export default function PostRoute() {
    return (
    <main className=" md:flex max-w-screen-xl mx-auto">
      <Navbar />      
      <Outlet />
    </main>
    )
  }