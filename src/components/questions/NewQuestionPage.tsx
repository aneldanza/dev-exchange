import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { InputField } from "../common/InputField";
import { RichTextEditor } from "../common/RichTextField";
import Button from "../common/Button";
import Flash from "../common/Flash";
import {
  useSearchTagsQuery,
  useCreateTagMutation,
  useCreateQuestionMutation,
} from "../../services/api";
import { useAuth } from "../../services/storeHooks";
import { MultiValue } from "react-select";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(200, "Title must be 200 characters or less")
    .required("Title is required"),
  body: Yup.string()
    .max(2000, "Description must be 2000 characters or less")
    .required("Description is required"),
  tags: Yup.array().min(1, "Select at least one tag"),
});

type Option = { label: string; value: number };

interface FormValues {
  title: string;
  body: string;
  tags: Option[];
}

const NewQuestionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const initialValues: FormValues = {
    title: "",
    body: "",
    tags: [],
  };

  const [query, setQuery] = useState<string>("");
  const [isFormReset, setResetForm] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [formError, setFormError] = useState<string[]>([]);

  const { data: suggestions = [], isLoading } = useSearchTagsQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  const [createTag] = useCreateTagMutation();
  const [createQuestion] = useCreateQuestionMutation();

  const handleCreateQuestion = async (data: FormValues) => {
    try {
      const formattedTags = data.tags.map((option) => ({
        name: option.label,
        id: option.value,
      }));
      const newQuestion = await createQuestion({
        user_id: user ? user.id : 0,
        title: data.title,
        body: data.body,
        tags: formattedTags,
      }).unwrap();
      console.log(newQuestion);
      setFormError([]);

      navigate(`/questions/${newQuestion.id}`);
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

  const onSubmit = (
    values: FormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {
      resetForm,
    }: {
      resetForm: () => void;
    }
  ) => {
    console.log(values);
    handleCreateQuestion(values);

    resetForm();
    setSelectedOptions([]);
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
      <h1 className="font-bold text-xl mb-4 flex">Ask a New Question</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className="space-y-6 w-full max-w-[800px]">
            <InputField name="title" label="Title" />

            <RichTextEditor
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
                title="Post your question"
                onClick={() => {}}
              />

              <Button
                className="btn btn-warning"
                title="Cancel"
                onClick={() => {
                  props.resetForm();
                  setSelectedOptions([]);
                  setFormError([]);
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

export default NewQuestionPage;
