import { useState } from "react";
import { PostMeta } from "../posts/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";
import { DeletePostModal } from "../common/DeletePostModal";
import { useAuth } from "../../services/storeHooks";
import { PostActions } from "../posts/PostActions";
import {
  useDeleteAnswerMutation,
  useUpdateAnswerMutation,
} from "../../services/api";
import { CommentsContainer } from "../comments/CommentsContainer";
import { PostVoteSection } from "../posts/PostVoteSection";
import { FaCheck } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import MarkdownViewer from "../common/MarkDownViewer";

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
    if (user && user.id !== questionAuthorId) return;
    try {
      await updateAnswer({
        id: answer.id,
        accepted: !answer.accepted,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const tooltipContent = () => {
    if (answer.accepted) {
      if (user && user.id === questionAuthorId) {
        return "you accepted this answer";
      } else {
        return "accepted answer";
      }
    } else {
      if (user && user.id === questionAuthorId) {
        return "accept answer";
      } else {
        return "";
      }
    }
  };

  return (
    <>
      <div id="container" className="flex gap-4">
        <div id="stats" className="flex flex-col items-center flex-none">
          <PostVoteSection
            postId={answer.id}
            votes={answer.votes}
            postType="Answer"
          />
          {((user && user.id === questionAuthorId) || answer.accepted) && (
            <button
              disabled={!!user && user.id != questionAuthorId}
              onClick={handleAcceptAnswer}
              className={
                user && user.id === questionAuthorId
                  ? "cursor-pointer"
                  : "cursor-default"
              }
            >
              <FaCheck
                data-tooltip-id="accept-answer"
                data-tooltip-content={tooltipContent()}
                className={`${
                  answer.accepted ? "text-green-500" : "text-appGray-100"
                } text-2xl disabled:opacity-50 outline-none`}
              />
              <ReactTooltip place="bottom" variant="dark" id="accept-answer" />
            </button>
          )}
        </div>
        <div id="post" className="flex-grow overflow-hidden">
          <MarkdownViewer content={answer.body} />

          <div className="mt-4">
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
