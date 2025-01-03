import { useState } from "react";
import { PostMeta } from "../posts/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";
import { DeletePostModal } from "../common/DeletePostModal";
import { useAuth } from "../../services/storeHooks";
import { PostActions } from "../posts/PostActions";
import { RichContent } from "../common/RichContent";
import {
  useDeleteAnswerMutation,
  useUpdateAnswerMutation,
} from "../../services/api";
import { CommentsContainer } from "../comments/CommentsContainer";
import { PostVoteSection } from "../posts/PostVoteSection";
import { FaCheck } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface AnswerProps {
  answer: AnswerData;
  questionAuthorId: number | null;
}

export const Answer: FC<AnswerProps> = ({ answer, questionAuthorId }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleteAnswer, { isLoading }] = useDeleteAnswerMutation();
  const [updateAnswer] = useUpdateAnswerMutation();

  const handleAcceptAnswer = async () => {
    try {
      await updateAnswer({
        id: answer.id,
        accepted: !answer.accepted,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <PostVoteSection
            postId={answer.id}
            votes={answer.votes}
            postType="Answer"
          />
          {user && user.id === questionAuthorId && (
            <div onClick={handleAcceptAnswer}>
              <FaCheck
                data-tooltip-id="accept-answer"
                data-tooltip-content={
                  answer.accepted ? "Accepted" : "Accept answer"
                }
                className={`${
                  answer.accepted ? "text-green-500" : "text-appGray-100"
                } text-2xl cursor-pointer`}
              />
              <ReactTooltip place="bottom" variant="dark" id="accept-answer" />
            </div>
          )}
        </div>
        <div className="flex-grow">
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
        </div>
      </div>
      <DeletePostModal
        openModal={showModal}
        setOpenModal={setShowModal}
        id={answer.id}
        prompt="Are you sure you want to delete this answer?"
        deleteRecord={deleteAnswer}
        isLoading={isLoading}
      />
    </>
  );
};
