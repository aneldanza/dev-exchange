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
import { RawTagData } from "../tags/types";
import { removeSelectElement } from "../../services/utils";

// import { QuillEditor } from "../common/QuillEditor";
import { useAuth } from "../../services/storeHooks";
import MarkdownEditor from "../common/MarkdownEditor";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(200, "Title must be 200 characters or less")
    .required("Title is required"),
  body: Yup.string()
    .max(5000, "Description must be 5000 characters or less")
    .required("Description is required"),
  tags: Yup.array().min(1, "Select at least one tag"),
});

const convertTagsToOptions = (tags: RawTagData[]): Option[] => {
  return tags.map((tag) => ({
    label: tag.name,
    value: tag.id.toString(),
  }));
};

interface QuestionFormProps {
  questionAction: (data: {
    title: string;
    body: string;
    tags: {
      name: string;
      id: number;
    }[];
  }) => Promise<void>;
  questionData?: { title: string; body: string; tags: RawTagData[] };
  submitText: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  questionAction,
  questionData = { title: "", body: "", tags: [] },
  submitText,
}) => {
  const initialTags = convertTagsToOptions(questionData.tags);

  const [query, setQuery] = useState<string>("");
  // const [isFormReset, setResetForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[]>([]);
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const { clearUser } = useAuth();

  const initialValues: FormValues = {
    title: questionData.title,
    body: questionData.body,
    tags: initialTags,
  };

  const { data, isLoading } = useSearchTagsQuery(
    { value: query, page: 1, limit: 10 },
    {
      skip: !query,
      refetchOnMountOrArgChange: true,
    }
  );

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
      if (e.status === 401) {
        clearUser();
      }
    }
  };

  const onSubmit = (values: FormValues) => {
    const modifiedBody = removeSelectElement(values.body);

    // Call handleQuestion with the modified values
    handleQuestion({ ...values, body: modifiedBody });
  };

  // creates a temporary tag when user types in a new tag
  const handleCreateTempTag = async (
    name: string,
    props: FormikProps<FormValues>
  ) => {
    try {
      const tagCount = props.values.tags.length;
      props.setFieldValue(
        "tags",
        [...props.values.tags, { label: name, value: `tempId-${tagCount}` }],
        true
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      e.data && e.data.errors && props.setErrors(e.data.errors);
    }
  };

  // loads new options when user types in the search input
  const loadTags = (): Option[] => {
    if (data === undefined || data.tags === undefined) {
      return [];
    }
    return convertTagsToOptions(data.tags);
  };

  // catches the change event when user selects new tag from options list
  const handleChange = (
    options: MultiValue<Option>,
    props: FormikProps<FormValues>
  ) => {
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

              <div className="mb-4">
                <MarkdownEditor
                  value={props.values.body}
                  onChange={(value) => {
                    props.setFieldValue("body", value);
                    props.setFieldTouched("body", true);
                  }}
                />
                {props.touched.body && props.errors.body && (
                  <div className="text-red-500 text-sm">
                    {props.errors.body}
                  </div>
                )}
              </div>

              <div>
                <div className="field-label">Tags</div>
                <CreatableSelect
                  id="tags"
                  name="tags"
                  value={props.values.tags}
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

                    setFormError([]);
                    // setResetForm(true);
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
