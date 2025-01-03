import { type FC, useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnswerData } from "./types";
import { Answer } from "./Answer";
import { sortItems } from "../../services/utils";
import { ListSubheader } from "../common/ListSubheader";
import { sortTabs } from "../common/constants";

interface AnswersListProps {
  answers: AnswerData[];
  questionAuthorId: number | null;
}

export const AnswersList: FC<AnswersListProps> = ({
  answers,
  questionAuthorId,
}) => {
  const answerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>(sortTabs[0]);
  const [sortedAnswers, setSortedAnswers] = useState<AnswerData[]>(answers);

  useEffect(() => {
    const answerId = new URLSearchParams(location.search).get("answerId");
    if (answerId && answerRefs.current[answerId]) {
      answerRefs.current[answerId]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.search]);

  useEffect(() => {
    if (answers && selectedTab) {
      const sorted = sortItems(answers, selectedTab);
      setSortedAnswers(sorted);
    }
  }, [answers, selectedTab]);

  return (
    <div className="flex flex-col my-6">
      <ListSubheader
        count={answers.length}
        keyword="Answer"
        sortTabs={sortTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="flex flex-col gap-4">
        {sortedAnswers.map((answer) => (
          <div
            key={answer.id}
            ref={(el) => (answerRefs.current[answer.id] = el)}
          >
            <Answer answer={answer} questionAuthorId={questionAuthorId} />
          </div>
        ))}
      </div>
    </div>
  );
};
