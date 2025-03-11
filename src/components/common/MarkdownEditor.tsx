import React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { customCommands } from "./commands";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (value?: string) => {
    onChange(value || "");
  };

  return (
    <div
      className="border border-gray-300 rounded-md mb-4"
      data-color-mode="github-light"
    >
      <MDEditor
        value={value}
        onChange={handleChange}
        // height={400}
        visibleDragbar={true}
        hideToolbar={false}
        fullscreen={false}
        enableScroll
        highlightEnable
        preview={"edit"}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [remarkGfm],
        }}
        commands={customCommands}
        textareaProps={{
          placeholder,
        }}
        className="text-lg leading-relaxed max-h-dvh"
      />
    </div>
  );
};

export default MarkdownEditor;
