"use client";

import { useFormState } from "react-dom";
import { exampleAction } from "../data/exampleAction";

/**
 * Example form component
 * Demonstrates the UI layer structure
 */
export function ExampleForm() {
  const [state, formAction] = useFormState(exampleAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          aria-invalid={state?.success === false ? "true" : "false"}
          aria-describedby={state?.success === false ? "email-error" : undefined}
        />
        {state?.success === false && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          aria-invalid={state?.success === false ? "true" : "false"}
          aria-describedby={state?.success === false ? "name-error" : undefined}
        />
        {state?.success === false && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Submit
      </button>

      {state?.success === true && (
        <p className="text-sm text-green-600" role="alert">
          Success!
        </p>
      )}
    </form>
  );
}

