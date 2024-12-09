import React from "react";
import { TopItemsCard } from "../TopItemsCard";
import { PostItem } from "../PostItem";
import { TagItem } from "../TagItem";
import { PostData } from "../types";
import { PostsByTag } from "../UserContext";
import { LimitedQuestionData } from "../../questions/types";

interface SummaryProps {
  questions: LimitedQuestionData[];
  answers: PostData[];
  id: number;
  sortedItems: PostsByTag[];
}

export const Summary: React.FC<SummaryProps> = ({
  questions,
  answers,
  id,
  sortedItems,
}) => {
  return (
    <div className="activity-list">
      <TopItemsCard<LimitedQuestionData>
        sortedItems={questions}
        name="question"
        renderItem={(question: LimitedQuestionData) => (
          <PostItem
            id={null}
            question_id={question.id}
            title={question.title}
            votes={question.votes}
            created_at={question.created_at}
          />
        )}
      />

      <TopItemsCard<PostData>
        sortedItems={answers}
        name="answer"
        renderItem={(answer: PostData) => (
          <PostItem
            id={answer.id}
            question_id={answer.question_id}
            title={answer.title}
            votes={answer.votes}
            created_at={answer.created_at}
          />
        )}
      />

      <TopItemsCard<PostsByTag>
        sortedItems={sortedItems}
        name="tag"
        renderItem={(tagItem: PostsByTag) => (
          <TagItem
            tag={tagItem.tag}
            userId={id}
            postsCount={tagItem.posts.length}
          />
        )}
      />
    </div>
  );
};
