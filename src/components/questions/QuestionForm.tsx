import React, { useState } from "react";
import { Formik, Form, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { InputField } from "../common/InputField";
import Button from "../common/Button";
import Flash from "../common/Flash";
import { useSearchTagsQuery, useCreateTagMutation } from "../../services/api";
import { MultiValue } from "react-select";
import { Option, FormValues } from "./types";
import { Tag } from "../tags/types";

import { QuillEditor } from "../common/QuillEditor";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(200, "Title must be 200 characters or less")
    .required("Title is required"),
  body: Yup.string()
    .max(5000, "Description must be 5000 characters or less")
    .required("Description is required"),
  tags: Yup.array().min(1, "Select at least one tag"),
});

interface QuestionFormProps {
  questionAction: (data: FormValues) => Promise<void>;
  questionData?: { title: string; body: string; tags: Tag[] };
  submitText: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  questionAction,
  questionData = { title: "", body: "", tags: [] },
  submitText,
}) => {
  const initialOptions = questionData.tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  const [query, setQuery] = useState<string>("");
  const [isFormReset, setResetForm] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(initialOptions);
  const [formError, setFormError] = useState<string[]>([]);

  const initialValues: FormValues = {
    title: questionData.title,
    body: questionData.body,
    tags: initialOptions,
  };

  const { data: suggestions = [], isLoading } = useSearchTagsQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  const [createTag] = useCreateTagMutation();

  const handleQuestion = async (data: FormValues) => {
    try {
      await questionAction(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormError([...e.data.errors]);
        } else {
          setFormError([e.data.error]);
        }
      } else {
        setFormError(["An error occurred. Please try again later."]);
      }
    }
  };

  const removeSelectElement = (body: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");

    // Remove all <select> elements
    const selects = doc.querySelectorAll("select");
    selects.forEach((select) => select.remove());

    // Serialize the modified HTML back to a string
    return doc.body.innerHTML;
  };

  const onSubmit = (
    values: FormValues,

    {
      resetForm,
    }: {
      resetForm: () => void;
    }
  ) => {
    const modifiedBody = removeSelectElement(values.body);

    // Call handleQuestion with the modified values
    handleQuestion({ ...values, body: modifiedBody });

    resetForm();
    setSelectedOptions(initialOptions);
    setResetForm(true);
  };

  const handleCreateTag = async (
    data: string,
    props: FormikProps<FormValues>
  ) => {
    try {
      const newTag = await createTag({ name: data }).unwrap();
      props.setFieldValue("tags", [
        ...props.values["tags"],
        { label: newTag.name, value: newTag.id },
      ]);
      setSelectedOptions([
        ...props.values["tags"],
        { label: newTag.name, value: newTag.id },
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className="space-y-6 w-full max-w-[800px]">
            <InputField name="title" label="Title" />

            <QuillEditor
              name="body"
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
                onInputChange={(inputValue) =>
                  setQuery(inputValue.toLowerCase())
                }
                isLoading={isLoading}
                options={loadTags()}
                onCreateOption={(value) =>
                  handleCreateTag(value.toLowerCase(), props)
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
                title={submitText}
                onClick={() => {}}
              />

              <Button
                className="btn btn-warning"
                title="Cancel"
                onClick={() => {
                  props.resetForm();
                  setSelectedOptions(initialOptions);
                  setFormError([]);
                  setResetForm(true);
                }}
                type="reset"
              />
            </div>
            {formError.length > 0 && (
              <Flash style="flash-error">
                <div className="list ">
                  {formError.map((error, index) => (
                    <div key={index}>{`error is: ${error}`}</div>
                  ))}
                </div>
              </Flash>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
