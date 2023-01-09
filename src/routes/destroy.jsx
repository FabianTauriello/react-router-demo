import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  // to test error handling on this action:
  // throw new Error("oh dang!");

  await deleteContact(params.contactId);
  return redirect("/");
}
