// Components
import Navbar from "components/Navbar";

// Remix tools
import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";

// Authenticator
import {
  supabaseStrategy,
} from "app/auth.server";

// Loader
export const loader = async ({ request, params }) => {
    
    const session = await supabaseStrategy.checkSession(request, {
        failureRedirect: "/login",
      });

      return json({ userId: params.session?.user?.id });
  };


export default function PostRoute() {
    const {userId} = useLoaderData()
    return (
    <main className=" md:flex max-w-screen-xl mx-auto">
      <Navbar />      
      <Outlet />
    </main>
    )
  }