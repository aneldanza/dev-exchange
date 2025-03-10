import React, { useState } from "react";
import MDEditor, { PreviewType } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { customCommands } from "./commands";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<PreviewType>("edit");

  return (
    <div
      className="border border-gray-300 rounded-md mb-4"
      data-color-mode="github-light"
    >
      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${
            preview === "edit" ? "bg-gray-200" : "bg-white"
          } border-r`}
          onClick={() => setPreview("edit")}
        >
          Write
        </button>

        <button
          className={`px-4 py-2 ${
            preview === "live" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setPreview("live")}
        >
          Live Preview
        </button>
      </div>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={400}
        visibleDragbar={false}
        hideToolbar={false}
        fullscreen={false}
        enableScroll
        highlightEnable
        preview={preview}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [remarkGfm],
        }}
        commands={customCommands}
      />
    </div>
  );
};

export default MarkdownEditor;
