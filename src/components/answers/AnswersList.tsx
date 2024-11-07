import { type FC } from "react";
import { AnswerData } from "./types";
import { Answer } from "./Answer";
import { formatCountString } from "../../services/utils";

interface AnswersListProps {
  answers: AnswerData[];
}

export const AnswersList: FC<AnswersListProps> = ({ answers }) => {
  return (
    <div className="flex flex-col my-6">
      <div className="text-lg">
        {formatCountString(answers.length, "answer", "answers")}
      </div>
      <div className="flex flex-col gap-4">
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  );
};
