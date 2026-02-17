import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

export const loader = () => redirect("/");

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("google", request);
};
