import React, { useState, useRef } from "react";
import { Formik, Form, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { InputField } from "../common/InputField";
import Button from "../common/Button";
import Flash from "../common/Flash";
import { useSearchTagsQuery } from "../../services/api";
import { MultiValue } from "react-select";
import { Option, FormValues } from "./types";
import { TagData } from "../tags/types";
import { removeSelectElement } from "../../services/utils";
// import { Alert } from "flowbite-react";

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
  questionAction: (data: {
    title: string;
    body: string;
    tags: {
      name: string;
      id: number;
    }[];
  }) => Promise<void>;
  questionData?: { title: string; body: string; tags: TagData[] };
  submitText: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  questionAction,
  questionData = { title: "", body: "", tags: [] },
  submitText,
}) => {
  const initialOptions = questionData.tags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }));

  const [query, setQuery] = useState<string>("");
  const [isFormReset, setResetForm] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(initialOptions);
  const [formError, setFormError] = useState<string[]>([]);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const initialValues: FormValues = {
    title: questionData.title,
    body: questionData.body,
    tags: initialOptions,
  };

  const { data: suggestions = [], isLoading } = useSearchTagsQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  const handleQuestion = async (data: FormValues) => {
    const formattedTags = data.tags.map((option) => ({
      name: option.label,
      id: option.value.startsWith("tempId-") ? 0 : Number(option.value),
    }));

    try {
      await questionAction({ ...data, tags: formattedTags });
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

  const onSubmit = (values: FormValues) => {
    const modifiedBody = removeSelectElement(values.body);

    // Call handleQuestion with the modified values
    handleQuestion({ ...values, body: modifiedBody });
  };

  const handleCreateTempTag = async (
    name: string,
    props: FormikProps<FormValues>
  ) => {
    try {
      // const newTag = await createTag({ name: name }).unwrap();
      const tagCount = props.values.tags.length;
      props.setFieldValue("tags", [
        ...props.values["tags"],
        { label: name, value: `tempId-${tagCount}` },
      ]);
      setSelectedOptions([
        ...props.values["tags"],
        { label: name, value: `tempId-${tagCount}` },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);

      e.data && e.data.errors && props.setErrors(e.data.errors);
    }
  };

  const loadTags = (): Option[] => {
    return suggestions.map((tag) => ({
      label: tag.name,
      value: tag.id.toString(),
    }));
  };

  const handleChange = (
    options: MultiValue<Option>,
    props: FormikProps<FormValues>
  ) => {
    setSelectedOptions(options as Option[]);
    props.setFieldTouched("tags", true);
    props.setFieldValue("tags", options);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {(props) => {
          return (
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
                    handleCreateTempTag(value.toLowerCase(), props)
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    props.isSubmitting ||
                    Object.keys(props.touched).length === 0 ||
                    !props.isValid
                  }
                >
                  {submitText}
                </button>

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

              <Flash
                style="failure"
                display={!!formError.length}
                resetDisplay={() => setFormError([])}
              >
                <ul className="list-item">
                  {formError.map((error, index) => (
                    <li key={index}>{`${error}`}</li>
                  ))}
                </ul>
              </Flash>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
