import React, { ChangeEvent } from "react";
import { useField, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value);
  };

  return (
    <div>
      <div>{label}</div>
      <input
        id={name}
        value={field.value}
        onChange={handleChange}
        className={`input-field ${meta && meta.error && "border-red"}`}
      />
      <ErrorMessage name={name} component="div" className="error-text" />
    </div>
  );
};
