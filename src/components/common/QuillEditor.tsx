import { useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css"; // Quill theme
import "highlight.js/styles/github.css"; // Highlight.js theme

interface QuillEditorProps {
  label: string;
  name: string;
  placeholder: string;
  changeHandler?: (value: string) => void;
  isFormReset?: boolean;
  initialValue?: string;
}

export const QuillEditor: FC<QuillEditorProps> = ({
  label,
  name,
  placeholder,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          syntax: {
            hljs,
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

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
    </div>
  );
};
