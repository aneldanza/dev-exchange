import React, { useState } from "react";
import { Formik, Form, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { InputField } from "../common/InputField";
import { RichTextEditor } from "../common/RichTextField";
import Button from "../common/Button";
import { useSearchTagsQuery, useCreateTagMutation } from "../../services/api";
import { MultiValue } from "react-select";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(50, "Title must be 50 characters or less")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description must be 500 characters or less")
    .required("Description is required"),
  tags: Yup.array().min(1, "Select at least one tag"),
});

type Option = { label: string; value: number };

interface FormValues {
  title: string;
  description: string;
  tags: Option[];
}

const NewQuestionPage: React.FC = () => {
  const initialValues: FormValues = {
    title: "",
    description: "",
    tags: [],
  };

  const [query, setQuery] = useState<string>("");
  const [isFormReset, setResetForm] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const { data: suggestions = [], isLoading } = useSearchTagsQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  const [createTag] = useCreateTagMutation();

  const onSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
    setSelectedOptions([]);
    setResetForm(true);

    // Handle form submission
  };

  const handleCreateTag = async (
    data: string,
    props: FormikProps<FormValues>
  ) => {
    try {
      const newTag = await createTag({ name: data }).unwrap();
      props.setFieldValue("tags", [
        ...props.values["tags"],
        { label: newTag.name, id: newTag.id },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);

      e.data && e.data.errors && props.setErrors(e.data.errors);
    }
  };

  const loadTags = (): Option[] => {
    return suggestions.map((tag) => ({ label: tag.name, value: tag.id }));
  };

  const handleChange = (
    options: MultiValue<Option>,
    props: FormikProps<FormValues>
  ) => {
    setSelectedOptions(options as Option[]);
    props.setFieldValue("tags", options);
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
              isFormReset={isFormReset}
            />

            <div>
              <div className="field-label">Tags</div>
              <CreatableSelect
                id="tags"
                name="tags"
                value={selectedOptions}
                onChange={(options) => handleChange(options, props)}
                onInputChange={(inputValue) => setQuery(inputValue)}
                isLoading={isLoading}
                options={loadTags()}
                onCreateOption={(value) => handleCreateTag(value, props)}
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
                onClick={() => {
                  props.resetForm();
                  setSelectedOptions([]);
                }}
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
