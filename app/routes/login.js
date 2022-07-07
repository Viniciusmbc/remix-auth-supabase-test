// Remix tools
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link, useTransition } from "@remix-run/react";
import { LoadingSpinner } from "components/Icons";

// Authenticator
import {
  authenticator,
  sessionStorage,
  supabaseStrategy,
} from "../auth.server";

// Actions
export const action = async ({ request }) => {
  await authenticator.authenticate("sb", request, {
    successRedirect: "/dashboard/movies",
    failureRedirect: "/login",
  });
};

// Loader
export const loader = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const sessionKey = session.get(authenticator.sessionKey);
  console.log(sessionKey);

  await supabaseStrategy.checkSession(request, {
    successRedirect: `/dashboard/${sessionKey.user?.id}/home`,
  });

  const error = session.get(authenticator.sessionErrorKey);

  return json({ error });
};

export default function Screen() {
  const { error } = useLoaderData();
  console.log(error);
  const transition = useTransition();

  return (
    <main className=" min-h-screen bg-darkBlue">
      <div className="mx-auto w-full max-w-md ">
        <div className="flex flex-col items-center space-y-6 px-10 ">
          <div className="py-12">
            <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
                fill="#FC4747"
              />
            </svg>
          </div>
          <Form
            method="post"
            className="mx-auto flex flex-col rounded-md bg-semiDarkBlue px-10"
          >
            <label className="mt-6 text-2xl text-white">Login</label>
            <input
              type="email"
              placeholder="Email address"
              className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              name="email"
              id="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              name="password"
              id="password"
            />
            <button
              className="mt-10 rounded-md bg-red py-2 hover:bg-white "
              type="submit"
            >
              {transition.state === "submitting" ? (
                <LoadingSpinner className="cursor-wait" color={`#FFF`} />
              ) : (
                "Log In to your account"
              )}
            </button>

            {error?.message && (
              <div className=" text-red py-6">
                <p> {error.message} </p>
              </div>
            )}
          </Form>
          <div className="py-6">
            <p className="text-white">
              Don't have an account?
              <Link className="text-red " to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
