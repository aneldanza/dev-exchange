import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="w-full text-appBlack" data-color-mode="github-light">
      <MDEditor.Markdown
        source={content}
        className="break-words whitespace-pre-wrap prose max-w-full"
      />
    </div>
  );
};

export default MarkdownViewer;
