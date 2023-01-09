import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

// important for understanding form submission!!:
/*

When the user clicks the submit button:

  1. <Form> prevents the default browser behavior of sending a new POST request to the server, but instead emulates the browser by creating a POST request with client side routing
  2. The <Form action="destroy"> matches the new route at "contacts/:contactId/destroy" and sends it the request
  3. After the action redirects, React Router calls all of the loaders for the data on the page to get the latest values (this is "revalidation"). useLoaderData returns new values and causes the components to update!

  Add a form, add an action, React Router does the rest.

*/
export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    // The form will post to the action and the data will be automatically revalidated.
    // Without JavaScript, when a form is submitted, the browser will create FormData and set it as the body of the request when it sends it to the server.
    // But, React Router prevents that and sends the request to your action instead, including the FormData.
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact.first} />
        <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
