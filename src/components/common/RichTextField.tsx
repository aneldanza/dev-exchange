import React, { useEffect, useRef } from "react";
import { useField, ErrorMessage } from "formik";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  label: string;
  name: string;
  placeholder: string;
}

const theme = "snow";

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder,
  label,
  name,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, , helpers] = useField(name);
  const { quillRef, quill } = useQuill({
    theme,
    modules: {
      toolbar: [
        [{ size: [] }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["blockquote", "code-block", "formula"],
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
    ],
    placeholder,
  });

  const initialValueSet = useRef(false);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        if (initialValueSet.current) {
          helpers.setValue(quill.root.innerHTML);
        }
      });

      // Set initial value
      if (!initialValueSet.current) {
        quill.clipboard.dangerouslyPasteHTML(field.value || "");
        initialValueSet.current = true;
      }
    }
  }, [quill, field.value, helpers]);

  return (
    <>
      <div className="w-full mb-5">
        <div className="font-semibold text-sm">{label}</div>
        <div
          id={name}
          className="border rounded-b-md overflow-hidden"
          ref={quillRef}
          style={{ height: "200px" }}
        ></div>
        <ErrorMessage name={name} component="div" className="error-text" />
      </div>
    </>
  );
};
