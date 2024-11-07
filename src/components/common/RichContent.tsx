import { FC } from "react";
import DOMPurify from "dompurify";

export const RichContent: FC<{ body: string }> = ({ body }) => {
  return (
    <div className="prose prose-sm max-w-full">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}
      />
    </div>
  );
};
