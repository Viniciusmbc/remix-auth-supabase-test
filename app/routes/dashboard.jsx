// Components
import Navbar from "components/Navbar";

// Remix tools
import {  Outlet } from "@remix-run/react";

// Supabase Strategy
import {supabaseStrategy } from "../auth.server";

export const loader = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/login",
  });

  return session;
};


export default function PostRoute() {
    return (
    <main className=" md:flex max-w-screen-xl mx-auto">
      <Navbar />      
      <Outlet />
    </main>
    )
  }