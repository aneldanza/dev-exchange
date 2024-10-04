import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
      <h1>Ask a New Question</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewQuestionPage;
