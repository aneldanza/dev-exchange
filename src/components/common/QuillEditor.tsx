import { useEffect, useRef, type FC } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css"; // Quill theme
import "highlight.js/styles/atom-one-dark.css";
import { useField, ErrorMessage } from "formik";
import DOMPurify from "dompurify";
import { Delta, EmitterSource } from "quill/core";

interface QuillEditorProps {
  label: string;
  name: string;
  placeholder: string;
  isFormReset?: boolean;
}

// Define custom icons
const icons = Quill.import("ui/icons") as Record<string, string>;
icons["code-block"] =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"></path></svg>';

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
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          syntax: {
            hljs,
          },
          toolbar: [
            ["bold", "italic", "underline", { color: [] }],
            ["blockquote", "code-block", "code"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
            ["clean"],
          ],
        },

        placeholder,
      });

      quillRef.current = quill;

      // Set initial value
      const sanitizedValue = DOMPurify.sanitize(initialValue);
      quill.clipboard.dangerouslyPasteHTML(0, sanitizedValue);

      const handleTextChange = (
        _delta: Delta,
        _oldContent: Delta,
        source: EmitterSource
      ) => {
        if (source === "user") {
          helpers.setTouched(true);
        }
        const value = quillRef.current?.root.innerHTML || "";
        helpers.setValue(value);
      };

      // Listen for changes and call changeHandler
      quill.on("text-change", handleTextChange);

      // Cleanup on unmount
      return () => {
        quill.off("text-change", handleTextChange); // Remove event listener
        quillRef.current = null; // Clear the ref
        editorRef.current = null; // Clear the ref
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

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
          className="border rounded-b-md overflow-hidden focus:border-appGray-500 whitespace-pre-wrap"
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
