import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import {
  authenticator,
  sessionStorage,
  supabaseStrategy,
} from "../auth.server";

export const action = async ({ request }) => {
  await authenticator.authenticate("sb", request, {
    successRedirect: "/private",
    failureRedirect: "/login",
  });
};

export const loader = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: "/private",
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get(authenticator.sessionErrorKey);

  return json({ error });
};

export default function Screen() {
  const { error } = useLoaderData();

  return (
    <Form method="post">
      {error && <div>{error.message}</div>}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button>Log In</button>
    </Form>
  );
}
