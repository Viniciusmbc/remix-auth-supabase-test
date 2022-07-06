import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator, supabaseStrategy } from "../auth.server";

export const loader = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/login",
  });

  console.log(session);

  return json({ email: session });
};

export default function Home() {
  return (
    <div>
      <h1> Home</h1>
    </div>
  );
}
