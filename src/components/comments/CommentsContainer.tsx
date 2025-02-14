import { CommentsList } from "./CommentsList";
import { CommentData } from "./types";
import { CommentForm } from "./CommentForm";
import { Button } from "../common/Button";
import { type FC, useState } from "react";
import { useCreateCommentMutation } from "../../services/api";

import { useAuth } from "../../services/storeHooks";
import Flash from "../common/Flash";

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
  const { user, clearUser } = useAuth();
  const [formError, setFormError] = useState<string[]>([]);

  const handleCreateComment = async (body: string) => {
    try {
      await createComment({
        body,
        commentable_id: postId,
        commentable_type: postType,
        user_id: user?.id,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormError([...e.data.errors]);
        } else {
          setFormError([e.data.error ?? "An error occurred"]);
        }
      } else {
        setFormError(["An error occurred. Please try again later."]);
      }
      if (e.status === 401) {
        clearUser();
      }
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
      <Flash
        style="failure"
        display={!!formError.length}
        resetDisplay={() => setFormError([])}
      >
        <ul className="list-item">
          {formError.map((error, index) => (
            <li key={index}>{`${error}`}</li>
          ))}
        </ul>
      </Flash>
    </div>
  );
};
