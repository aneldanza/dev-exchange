import React from "react";
import { TopItemsCard } from "../TopItemsCard";
import { PostItem } from "../PostItem";
import { TagItem } from "../TagItem";
import { UserAnswerData } from "../types";
import { PostsByTag } from "../UserContext";
import { QuestionData } from "../../questions/types";

interface SummaryProps {
  questions: QuestionData[];
  answers: UserAnswerData[];
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
      <TopItemsCard<QuestionData>
        sortedItems={questions}
        name="question"
        renderItem={(question: QuestionData) => (
          <PostItem
            id={question.id}
            title={question.title}
            votes={question.votes}
            type="question"
            created_at={question.created_at}
          />
        )}
      />

      <TopItemsCard<UserAnswerData>
        sortedItems={answers}
        name="answer"
        renderItem={(answer: UserAnswerData) => (
          <PostItem
            id={answer.question_id}
            title={answer.question_title}
            votes={answer.votes}
            type="question"
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
