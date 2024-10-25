import { useEffect, useRef, type FC } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css"; // Quill theme
import "highlight.js/styles/atom-one-dark.css";
import { useField, ErrorMessage } from "formik";

interface QuillEditorProps {
  label: string;
  name: string;
  placeholder: string;
  isFormReset?: boolean;
  initialValue?: string;
}

export const QuillEditor: FC<QuillEditorProps> = ({
  label,
  name,
  placeholder,
  isFormReset,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const [field, , helpers] = useField(name);
  const initialValue = field.value;

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          syntax: {
            hljs,
          },
          toolbar: [
            ["bold", "italic", "underline", { color: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
            ["clean"],
          ],
        },

        placeholder,
      });

      // Set initial value

      quillRef.current.clipboard.dangerouslyPasteHTML(0, initialValue);

      // Listen for changes and call changeHandler
      quillRef.current.on("text-change", () => {
        const value = quillRef.current?.root.innerHTML || "";
        helpers.setValue(value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFormReset && quillRef.current) {
      quillRef.current.root.innerHTML = initialValue;
    }
  }, [isFormReset, initialValue]);

  return (
    <div>
      <div className="field-label">{label}</div>

      <div className="">
        <div
          id={name}
          ref={editorRef}
          className="border rounded-b-md overflow-hidden focus:border-appGray-500"
          style={{
            height: "200px",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
        />
      </div>
      <ErrorMessage name={name} component="div" className="error-text" />
    </div>
  );
};
