import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { authenticator, supabaseStrategy } from "../auth.server";

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

export default function Screen() {
  const { email } = useLoaderData();

  console.log(email);
  return (
    <>
      <h1>Hello</h1>

      <Form method="post">
        <button>Log Out</button>
      </Form>
    </>
  );
}
