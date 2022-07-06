import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator, supabaseStrategy } from "../auth.server";
import Navbar from "components/Navbar";

export const action = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

export const loader = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/login",
  });

  console.log(session);

  return json({ email: session });
};

export default function Dashboard() {
  const { email } = useLoaderData();
  console.log(email);
  return (
    <main>
      <Navbar />

      <Outlet />
    </main>
  );
}
