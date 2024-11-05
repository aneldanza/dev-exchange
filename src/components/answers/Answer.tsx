import { PostMeta } from "../common/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";

export const Answer: FC<{ answer: AnswerData }> = ({ answer }) => {
  return (
    <div className="answer">
      <div className="answer-body">{answer.body}</div>
      <div className="flex justify-end">
        <PostMeta
          userId={answer.user.id}
          username={answer.user.username}
          createdAt={answer.created_at}
          actionWord="answered"
          theme="answer-meta"
        />
      </div>
    </div>
  );
};
