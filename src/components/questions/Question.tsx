import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { DeleteQuestionModal } from "./DeleteQuestionModal";
import DOMPurify from "dompurify";
import { useAuth } from "../../services/storeHooks";
import { QuestionData } from "./types";
import Button from "../common/Button";
import { PostMeta } from "../common/PostMeta";
import { AnswersList } from "../answers/AnswersList";
import { AnswerForm } from "../answers/AnswerForm";
import { QuestionTags } from "./QuestionTags";
import { useHighlightCodeBlocks } from "../../hooks/useHighlightCodeBlocks";

interface QuestionProps {
  question: QuestionData;
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

const PostActions: React.FC<{
  questionId: number;
  setShowModal: (show: boolean) => void;
}> = ({ questionId, setShowModal }) => (
  <div className="py-2 flex gap-2">
    <Link to={`/questions/${questionId}/edit`} className="action">
      Edit
    </Link>
    <Button
      title="Delete"
      className="action"
      onClick={() => setShowModal(true)}
    />
  </div>
);

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  useHighlightCodeBlocks(question);

  useEffect(() => {
    setShowAnswerForm(
      !!(user && question.answers.every((answer) => answer.user.id !== user.id))
    );
  }, [user, question.answers]);

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

      <div className="max-w-3xl w-full flex flex-col gap-4 mt-4">
        <div className="prose prose-sm max-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.body),
            }}
          />
        </div>

        <QuestionTags tags={question.tags} />

        <div>
          {user && question.user.id === user.id && (
            <PostActions questionId={question.id} setShowModal={setShowModal} />
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

        {question.answers.length > 0 && (
          <AnswersList answers={question.answers} />
        )}

        {user ? (
          <div>
            {question.answers.some((answer) => answer.user.id === user.id) && (
              <Button
                title="Add another answer"
                onClick={() => setShowAnswerForm(true)}
                className={`btn btn-primary ${showAnswerForm ? "hidden" : ""}`}
              />
            )}

            <div className={`${!showAnswerForm && "hidden"}`}>
              <AnswerForm
                questionId={question.id}
                userId={user.id}
                setShowAnswerForm={setShowAnswerForm}
              />
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn ">
            Login to answer
          </Link>
        )}
      </div>

      <DeleteQuestionModal
        openModal={showModal}
        setOpenModal={setShowModal}
        questionId={question.id}
      />
    </div>
  );
};
