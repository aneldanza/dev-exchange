import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

// Define the types for error handling
interface BackendError {
  status: number;
  data: { message: string };
}

interface WithErrorProps {
  error?: FetchBaseQueryError | SerializedError | undefined;
}

// The `withError` HOC with error component handling different error types
export const withError = <T extends object>(
  Component: React.ComponentType<T>,
  ErrorComponent: React.ComponentType<{ message: string }> | null = null
) => {
  return function WithErrorWrapper(props: WithErrorProps & T) {
    const { error, ...rest } = props;
    let message = "";

    if (!error) {
      return <Component {...(rest as T)} />;
    }

    // Handle FetchBaseQueryError (which includes status codes and backend error messages)
    if (error && "status" in error) {
      const backendError = error as BackendError;
      message = backendError.data?.message || `Error ${backendError.status}`;
    }

    // Handle SerializedError (generic errors)
    if (error && "message" in error) {
      message = error.message || "Unknown Error";
    }

    return ErrorComponent ? (
      <ErrorComponent message={message} />
    ) : (
      <div>Error: {message}</div>
    );
  };
};

export default withError;
