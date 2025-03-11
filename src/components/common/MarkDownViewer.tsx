import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface MarkdownViewerProps {
  content: string;
  textSize?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  textSize,
}) => {
  return (
    <div className="w-full text-appBlack" data-color-mode="github-light">
      <MDEditor.Markdown
        source={content}
        className={`break-words whitespace-pre-wrap prose max-w-full ${
          textSize ? textSize : "prose-sm"
        }`}
      />
    </div>
  );
};

export default MarkdownViewer;
