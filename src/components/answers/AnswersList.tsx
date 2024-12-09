import { type FC, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnswerData } from "./types";
import { Answer } from "./Answer";
import { formatCountString } from "../../services/utils";

interface AnswersListProps {
  answers: AnswerData[];
}

export const AnswersList: FC<AnswersListProps> = ({ answers }) => {
  const answerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();

  useEffect(() => {
    const answerId = new URLSearchParams(location.search).get("answerId");
    if (answerId && answerRefs.current[answerId]) {
      answerRefs.current[answerId]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.search]);

  return (
    <div className="flex flex-col my-6">
      <div className="text-lg">
        {formatCountString(answers.length, "answer", "answers")}
      </div>
      <div className="flex flex-col gap-4">
        {answers.map((answer) => (
          <div
            key={answer.id}
            ref={(el) => (answerRefs.current[answer.id] = el)}
          >
            <Answer answer={answer} />
          </div>
        ))}
      </div>
    </div>
  );
};
