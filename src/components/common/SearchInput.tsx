import React from "react";
import { TextInput, TextInputProps } from "flowbite-react";
import { Form, Formik, Field } from "formik";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  handleSearch: (values: { search: string }) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearch,
  placeholder,
}) => {
  const initialValues = {
    search: "",
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSearch}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="search">
              {({ field }: { field: TextInputProps }) => (
                <TextInput
                  {...field}
                  placeholder={placeholder || "Search..."}
                  icon={MagnifyingGlassIcon}
                  color="gray"
                  sizing="sm"
                  theme={{
                    field: {
                      // base: "relative z-10",
                      input: {
                        base: "flex flex-grow-1 w-full text-sm sm:text-sm lg:text-sm",
                        colors: {
                          gray: "border-appGray-100 focus:border-blue-700 focus:ring-blue-700",
                        },
                      },
                    },
                  }}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchInput;
