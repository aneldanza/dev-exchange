import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";
import moment from "moment";

import { DeleteQuestionModal } from "./DeleteQuestionModal";

import DOMPurify from "dompurify";
import { useAuth } from "../../services/storeHooks";
import { QuestionData } from "./types";
import Button from "../common/Button";
import { Tag } from "../tags/Tag";
import { PostMeta } from "../common/PostMeta";
import { AnswersList } from "../answers/AnswersList";
import { AnswerForm } from "../answers/AnswerForm";

interface QuestionProps {
  question?: QuestionData;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  hljs.configure({
    cssSelector: ".ql-code-block",
    ignoreUnescapedHTML: true,
  });

  useEffect(() => {
    if (question) {
      document.querySelectorAll(".ql-code-block-container").forEach((block) => {
        block.classList.add("custom-code-block-container");
      });

      document.querySelectorAll(".ql-code-block").forEach((block) => {
        const element = block as HTMLElement;

        // delete data-highlighted attribute to prevent error
        delete element.dataset.highlighted;

        // get language from data-language attribute or default to "plaintext"
        const language = element.getAttribute("data-language") || "plaintext";

        // set language class on code block
        element.classList.add(`language-${language}`);
      });

      document.querySelectorAll("code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });

      hljs.highlightAll();
    }
  }, [question]);

  if (!question) {
    return <div>No question data available.</div>;
  }

  return (
    <div className="">
      <div className="border-b py-4">
        <h2 className="question-title ">{question.title}</h2>
        <div className="flex gap-4 text-xs sm:text-sm flex-wrap">
          <div className="whitespace-nowrap">{`asked ${moment(
            question.created_at
          ).fromNow()}`}</div>
          <div className="whitespace-nowrap">{`modified ${moment(
            question.updated_at
          ).fromNow()}`}</div>
        </div>
      </div>
      <div className="max-w-3xl w-full flex flex-col gap-4 mt-4">
        <div className="prose prose-sm max-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.body),
            }}
          />
        </div>
        <div className="flex gap-2">
          {question.tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <div className="">
          {user && question.user.id === user.id && (
            <div className="py-2 flex gap-2">
              <Link to={`/questions/${question.id}/edit`} className="action">
                Edit
              </Link>
              <Button
                title="Delete"
                className="action"
                onClick={() => setShowModal(true)}
              />
            </div>
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

        {user && (
          <div>
            <AnswerForm questionId={question.id} userId={user.id} />
          </div>
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
