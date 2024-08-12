import React from "react";
import { useField, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ name, label }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <div>{label}</div>
      <input
        id={name}
        {...field}
        className={`input-field ${
          meta && meta.touched && meta.error && "border-red"
        }`}
      />
      <ErrorMessage name={name} component="div" className="error-text" />
    </div>
  );
};
