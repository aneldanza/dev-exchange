import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "../common/InputField";
import { RichTextEditor } from "../common/RichTextField";
import Button from "../common/Button";

const NewQuestionPage: React.FC = () => {
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(50, "Title must be 50 characters or less")
      .required("Title is required"),
    description: Yup.string()
      .max(500, "Description must be 500 characters or less")
      .required("Description is required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
    // Handle form submission
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 flex">Ask a New Question</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="space-y-6">
            <div>
              <InputField name="title" label="Title" />
            </div>
            <div>
              <RichTextEditor
                name="description"
                label="Description"
                placeholder="Add content of your question here..."
              />
            </div>
            <div className="flex flex-col space-y-6 ">
              <Button
                className="btn btn-primary"
                title="Post your question"
                onClick={() => {}}
              />

              <Button
                className="btn btn-warning"
                title="Cancel"
                onClick={() => {}}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewQuestionPage;
