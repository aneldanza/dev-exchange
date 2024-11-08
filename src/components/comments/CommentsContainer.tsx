import { CommentsList } from "./CommentsList";
import { CommentData } from "./types";
import { CommentForm } from "./CommentForm";
import { Button } from "../common/Button";
import { type FC, useState } from "react";

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

  const { user } = useAuth();

  return (
    <div className="w-full py-4">
      <div>
        <CommentsList comments={comments} user={user} />

        {formVisible && (
          <div className="mt-4">
            <CommentForm
              postType={postType}
              postId={postId}
              setFormVisible={setFormVisible}
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
