import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { InputField } from "../common/InputField";
import { RichTextEditor } from "../common/RichTextField";
import Button from "../common/Button";
import { useGetTagsQuery } from "../../services/api";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(50, "Title must be 50 characters or less")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description must be 500 characters or less")
    .required("Description is required"),
  tags: Yup.array().min(1, "Select at least one tag"),
});

const NewQuestionPage: React.FC = () => {
  const initialValues = {
    title: "",
    description: "",
    tags: [],
  };

  const { data: tags } = useGetTagsQuery(undefined);

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
        {(props) => (
          <Form className="space-y-6">
            <InputField name="title" label="Title" />

            <RichTextEditor
              name="description"
              label="Description"
              placeholder="Add content of your question here..."
            />

            <div>
              <div className="field-label">Tags</div>
              <Select
                options={tags?.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                onChange={(options) =>
                  props.setFieldValue(
                    "tags",
                    options.map((option) => option.value)
                  )
                }
                isMulti
              />
              <ErrorMessage
                name="tags"
                component="div"
                className="error-text"
              />
            </div>

            <div className="flex flex-col space-y-6 ">
              <Button
                type="submit"
                className="btn btn-primary"
                title="Post your question"
                onClick={() => {}}
              />

              <Button
                className="btn btn-warning"
                title="Cancel"
                onClick={() => {}}
                type="reset"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewQuestionPage;
