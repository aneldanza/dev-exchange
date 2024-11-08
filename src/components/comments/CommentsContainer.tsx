import { CommentsList } from "./CommentsList";
import { CommentData } from "./types";
import { CommentForm } from "./CommentForm";
import { Button } from "../common/Button";
import { type FC, useState } from "react";

interface CommentsContainerProps {
  comments: CommentData[];
  postType: string;
  postId: number;
}

export const CommentsContainer: FC<CommentsContainerProps> = ({
  comments,
  postId,
  postType,
}) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);

  return (
    <div className="w-full py-4">
      <div>
        <CommentsList comments={comments} />
        {formVisible && (
          <CommentForm
            postType={postType}
            postId={postId}
            setFormVisible={setFormVisible}
          />
        )}
      </div>
      <div>
        <Button
          className={`btn btn-secondary ${formVisible ? "hidden" : ""}`}
          title="Add Comment"
          type="button"
          onClick={() => setFormVisible(true)}
        />
      </div>
    </div>
  );
};
