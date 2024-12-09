import React from "react";
import { TopItemsCard } from "../TopItemsCard";
import { PostItem } from "../PostItem";
import { TagItem } from "../TagItem";
import { PostData, VoteData } from "../types";
import { PostsByTag } from "../UserContext";
import { LimitedQuestionData } from "../../questions/types";
import { formatCountString } from "../../../services/utils";

interface SummaryProps {
  questions: LimitedQuestionData[];
  answers: PostData[];
  id: number;
  sortedItems: PostsByTag[];
  votes: VoteData[];
}

export const Summary: React.FC<SummaryProps> = ({
  questions,
  answers,
  id,
  sortedItems,
  votes,
}) => {
  const upvotes = votes.filter((v) => v.value === 1).length;
  const questionVotes = votes.filter((v) => v.votable_type === "Question");
  const answerVotes = votes.filter((v) => v.votable_type === "Answer");

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

      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg">Votes cast</div>
        </div>
        <div className="activity-card">
          <div className="grid grid-cols-3 p-4 text-sm justify-between">
            <div className="">
              <div>{upvotes}</div>
              <div className="text-xs text-appGray-100">
                {formatCountString(upvotes, "upvote", "upvotes").split(" ")[1]}
              </div>
            </div>
            <div className="">
              <div>{questionVotes.length}</div>
              <div className="text-xs text-appGray-100">
                {
                  formatCountString(
                    questionVotes.length,
                    "question vote",
                    "question votes"
                  ).split(" ")[1]
                }
              </div>
            </div>
            <div className="">
              <div>{answerVotes.length}</div>
              <div className="text-xs text-appGray-100">
                {
                  formatCountString(
                    answerVotes.length,
                    "answer vote",
                    "answer votes"
                  ).split(" ")[1]
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
