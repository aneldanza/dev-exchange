import { useState } from "react";
import { PostMeta } from "../common/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";
import { DeletePostModal } from "../common/DeletePostModal";
import { useAuth } from "../../services/storeHooks";
import { PostActions } from "../common/PostActions";
import { RichContent } from "../common/RichContent";
import { useDeleteAnswerMutation } from "../../services/api";
import { CommentsContainer } from "../comments/CommentsContainer";

interface AnswerProps {
  answer: AnswerData;
}

export const Answer: FC<AnswerProps> = ({ answer }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleteAnswer, { isLoading }] = useDeleteAnswerMutation();

  return (
    <div className="answer">
      <RichContent body={answer.body} />

      <div>
        {user && answer.user.id === user.id && (
          <PostActions
            postId={answer.id}
            setShowModal={setShowModal}
            name="answers"
          />
        )}

        <div className="flex justify-end">
          <PostMeta
            userId={answer.user.id}
            username={answer.user.username}
            createdAt={answer.created_at}
            actionWord="answered"
            theme="answer-meta"
          />
        </div>

        <CommentsContainer
          comments={answer.comments}
          postId={answer.id}
          postType="Answer"
        />
      </div>

      <DeletePostModal
        openModal={showModal}
        setOpenModal={setShowModal}
        id={answer.id}
        prompt="Are you sure you want to delete this answer?"
        deleteRecord={deleteAnswer}
        isLoading={isLoading}
      />
    </div>
  );
};
