import React from "react";
import { TextInput, TextInputProps } from "flowbite-react";
import { Form, Formik, Field } from "formik";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  handleSearch: (values: { search: string }) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleSearch }) => {
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
                  placeholder="Search"
                  icon={MagnifyingGlassIcon}
                  color="gray"
                  sizing="sm"
                  theme={{
                    field: {
                      input: {
                        base: "flex flex-grow-1 w-full text-sm",
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
