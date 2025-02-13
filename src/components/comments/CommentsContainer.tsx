import { CommentsList } from "./CommentsList";
import { CommentData } from "./types";
import { CommentForm } from "./CommentForm";
import { Button } from "../common/Button";
import { type FC, useState } from "react";
import { useCreateCommentMutation } from "../../services/api";

import { useAuth } from "../../services/storeHooks";

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
  const [createComment] = useCreateCommentMutation();
  const { user } = useAuth();

  const handleCreateComment = async (body: string) => {
    try {
      await createComment({
        body,
        commentable_id: postId,
        commentable_type: postType,
        user_id: user?.id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-4">
      <div>
        <CommentsList comments={comments} />

        {formVisible && (
          <div className="mt-4">
            <CommentForm
              setFormVisible={setFormVisible}
              formAction={handleCreateComment}
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button
          className={`btn btn-secondary border-none ${
            formVisible ? "hidden" : ""
          }`}
          title="Add Comment"
          type="button"
          onClick={() => setFormVisible(true)}
        />
      </div>
    </div>
  );
};
