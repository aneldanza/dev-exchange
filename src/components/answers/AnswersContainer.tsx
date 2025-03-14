import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { AnswerForm } from "./AnswerForm";
import { AnswersList } from "./AnswersList";
import { useCreateAnswerMutation } from "../../services/api";
import { AnswerData } from "./types";
import { useAuth } from "../../services/storeHooks";

interface AnswersContainerProps {
  questionId: number;
  questionAuthorId: number | null;
  answers: AnswerData[];
}

export const AnswersContainer: React.FC<AnswersContainerProps> = ({
  questionId,
  answers,
  questionAuthorId,
}) => {
  const [createAnswer] = useCreateAnswerMutation();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setShowAnswerForm(
      !!(user && answers.every((answer) => answer.user.id !== user.id))
    );
  }, [user, answers]);

  const addAnswer = async (values: { body: string; user_id: number }) => {
    await createAnswer({
      question_id: questionId,
      user_id: values.user_id,
      body: values.body,
    }).unwrap();
  };

  return (
    <div className="mt-8">
      {answers.length > 0 && (
        <AnswersList answers={answers} questionAuthorId={questionAuthorId} />
      )}

      {user ? (
        <div>
          {answers.some((answer) => answer.user.id === user.id) && (
            <Button
              title="Add another answer"
              onClick={() => setShowAnswerForm(true)}
              className={`btn btn-primary ${showAnswerForm ? "hidden" : ""}`}
            />
          )}

          <div className={`${!showAnswerForm && "hidden"}`}>
            <AnswerForm
              answerAction={addAnswer}
              setShowAnswerForm={setShowAnswerForm}
            />
          </div>
        </div>
      ) : (
        <Link to="/login" className="btn btn-secondary">
          Login to answer
        </Link>
      )}
    </div>
  );
};
