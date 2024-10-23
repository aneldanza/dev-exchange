import React, { useEffect, useRef } from "react";
import { useField, ErrorMessage } from "formik";

// import hljs from "highlight.js";
import "highlight.js/styles/github.css";

// hljs.configure({
//   languages: [
//     "javascript",
//     "python",
//     "ruby",
//     "java",
//     "c",
//     "cpp",
//     "html",
//     "css",
//     "json",
//     "ruby",
//     "php",
//     "sql",
//     "shell",
//     "typescript",
//     "jsx",
//     "tsx",
//     "yaml",
//     "markdown",
//     "xml",
//     "makefile",
//     "dockerfile",
//     "plaintext",
//   ],
// });

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Quill from "quill";

interface RichTextEditorProps {
  label: string;
  name: string;
  placeholder: string;
  changeHandler?: (value: string) => void;
  isFormReset?: boolean;
  initialValue?: string;
}

const theme = "snow";

// Define custom icons
const icons = Quill.import("ui/icons") as { [key: string]: string };
icons["code-block"] =
  "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'><path stroke-linecap='round' stroke-linejoin='round' d='m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z' /></svg>";

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder,
  label,
  name,
  changeHandler,
  isFormReset,
  initialValue = "",
}) => {
  const [field, , helpers] = useField(name);

  const { quillRef, quill } = useQuill({
    theme,
    modules: {
      // syntax: {
      //   hljs,
      // },
      toolbar: [
        [{ size: [] }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        [],
        ["blockquote", "code", "code-block", "formula"],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "list",
      "indent",
      "link",
      "image",
      "align",
      "color",
      "code-block",
      "blockquote",
      "code",
    ],
    placeholder,
  });

  const initialValueSet = useRef(false);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        if (initialValueSet.current) {
          helpers.setValue(quill.root.innerHTML);
          changeHandler && changeHandler(quill.root.innerHTML);
        }
      });

      // Set initial value
      if (!initialValueSet.current) {
        quill.clipboard.dangerouslyPasteHTML(field.value || initialValue);
        initialValueSet.current = true;
      }
    }
  }, [quill, field.value, changeHandler, helpers, initialValue]);

  useEffect(() => {
    if (quill && isFormReset) {
      quill.clipboard.dangerouslyPasteHTML(initialValue);
    }
  }, [isFormReset, quill, initialValue]);

  return (
    <div className="w-full mb-5">
      <div className="field-label">{label}</div>
      <div
        id={name}
        className="border rounded-b-md overflow-hidden focus:border-appGray-500"
        ref={quillRef}
        style={{ height: "200px" }}
      ></div>
      <ErrorMessage name={name} component="div" className="error-text" />
    </div>
  );
};
