// Components
import Navbar from "components/Navbar";

// Remix tools
import { json } from "@remix-run/node";
import { useParams, useLoaderData, Outlet } from "@remix-run/react";

// Authenticator
import {
  supabaseStrategy,
} from "app/auth.server";

// Loader
export const loader = async ({ request, params }) => {
    
    const session = await supabaseStrategy.checkSession(request, {
        failureRedirect: "/login",
      });

      console.log(session.user.id)
     
      return json({ userId: params.session?.user?.id });
  };


export default function PostRoute() {
    const {userId} = useLoaderData()
    console.log(userId)
    return (
    <main>
      <Navbar />      
      <Outlet />
    </main>
        
    )
    
  }