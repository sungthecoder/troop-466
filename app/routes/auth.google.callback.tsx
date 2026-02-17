import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.authenticate("google", request);
    const session = await getSession(request.headers.get("Cookie"));
    session.set("user", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch {
    return redirect("/403");
  }
};
