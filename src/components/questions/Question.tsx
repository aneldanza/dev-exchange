import React, { useState } from "react";
import moment from "moment";
import { PostVoteSection } from "../common/PostVoteSection";
import { DeleteQuestionModal } from "./DeleteQuestionModal";
import { useAuth } from "../../services/storeHooks";
import { QuestionData } from "./types";
import { PostMeta } from "../common/PostMeta";
import { QuestionTags } from "./QuestionTags";
import { PostActions } from "../common/PostActions";
import { useHighlightCodeBlocks } from "../hooks/useHighlightCodeBlocks";
import { AnswersContainer } from "../answers/AnswersContainer";
import { RichContent } from "../common/RichContent";
import { CommentsContainer } from "../comments/CommentsContainer";

interface QuestionProps {
  question: QuestionData | undefined;
}

const QuestionMeta: React.FC<{ created_at: string; updated_at: string }> = ({
  created_at,
  updated_at,
}) => (
  <div className="flex gap-4 text-xs sm:text-sm flex-wrap">
    <div className="whitespace-nowrap">{`asked ${moment(
      created_at
    ).fromNow()}`}</div>
    <div className="whitespace-nowrap">{`modified ${moment(
      updated_at
    ).fromNow()}`}</div>
  </div>
);

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useHighlightCodeBlocks(question);

  if (!question) {
    return <div>No question data available.</div>;
  }

  return (
    <div className="">
      <div className="border-b py-4">
        <h2 className="question-title ">{question.title}</h2>

        <QuestionMeta
          created_at={question.created_at}
          updated_at={question.updated_at}
        />
      </div>

      <div className="max-w-3xl w-full ">
        <div className="flex gap-4 mt-4 align-top">
          <div className="pt-4">
            <PostVoteSection
              postId={question.id}
              votes={question.votes}
              postType="Question"
            />
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <RichContent body={question.body} />

            <QuestionTags tags={question.tags} />

            <div>
              {user && question.user.id === user.id && (
                <PostActions
                  postId={question.id}
                  setShowModal={setShowModal}
                  name="questions"
                />
              )}

              <div className="flex justify-end">
                <PostMeta
                  userId={question.user.id}
                  username={question.user.username}
                  createdAt={question.created_at}
                  actionWord="asked"
                  theme="question-meta"
                />
              </div>
            </div>

            <CommentsContainer
              comments={question.comments}
              postId={question.id}
              postType="Question"
            />
          </div>
        </div>

        <AnswersContainer questionId={question.id} answers={question.answers} />
      </div>

      <DeleteQuestionModal
        openModal={showModal}
        setOpenModal={setShowModal}
        questionId={question.id}
      />
    </div>
  );
};
