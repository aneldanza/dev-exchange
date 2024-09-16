import React from "react";

// Define the expected props for the HOC, including the loading and error states
interface WithLoadingProps<T> {
  data?: T;
  isLoading: boolean;
}

// The `withLoading` function accepts a component and an optional loading component
export const withLoading = <T extends object>(
  Component: React.ComponentType<T>,
  LoadingComponent: React.ComponentType | null = null
) => {
  return function WithLoadingWrapper(props: WithLoadingProps<T> & T) {
    const { isLoading, data, ...rest } = props;

    if (isLoading) {
      return LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>;
    }

    // Pass the data and remaining props to the wrapped component
    return <Component data={data} {...(rest as T)} />;
  };
};

export default withLoading;
