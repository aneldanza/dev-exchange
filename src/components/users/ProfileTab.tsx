import React, { useCallback } from "react";
import { FullUserData, UserAnswerData } from "./types";
import { formatCountString } from "../../services/utils";
import { RichContent } from "../common/RichContent";
import { TagData } from "../tags/types";
import { QuestionData } from "../questions/types";
import { TopTags } from "./TopTags";

interface ProfileTabProps {
  data: FullUserData;
  setActiveTab: (tab: string) => void;
}

const Stats: React.FC<{ questionsCount: number; answersCount: number }> = ({
  questionsCount,
  answersCount,
}) => (
  <div>
    <div className="text-lg">Stats</div>
    <div className="card">
      <div className="flex gap-4">
        <div className="list">
          <div>{answersCount}</div>
          <div className="text-xs text-appGray-100">
            {formatCountString(answersCount, "answer", "answers").split(" ")[1]}
          </div>
        </div>
        <div className="list">
          <div>{questionsCount}</div>
          <div className="text-xs text-appGray-100">
            {
              formatCountString(questionsCount, "question", "questions").split(
                " "
              )[1]
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About: React.FC<{
  description: string;
  setActiveTab: (tab: string) => void;
}> = ({ description, setActiveTab }) => (
  <div>
    <div className="text-lg">About</div>
    {description ? (
      <RichContent body={description} />
    ) : (
      <div className="card">
        <div className="text-appGray-100 text-sm">
          Your about me section is empty. Would you like to add something? 🤔{" "}
          <span onClick={() => setActiveTab("Settings")} className="hyperlink">
            Edit Profile
          </span>
        </div>
      </div>
    )}
  </div>
);

export const ProfileTab: React.FC<ProfileTabProps> = ({
  data,
  setActiveTab,
}) => {
  const aggregateTags = useCallback(
    (questions: QuestionData[], answers: UserAnswerData[]) => {
      const tags: Record<
        string,
        { tag: TagData; posts: (QuestionData | UserAnswerData)[] }
      > = {};

      const posts = [...questions, ...answers];

      posts.forEach((post) => {
        post.tags.forEach((tag) => {
          if (tags[tag.id]) {
            (tags[tag.id].posts as (QuestionData | UserAnswerData)[]).push(
              post
            );
          } else {
            tags[tag.id] = {
              tag,
              posts: [post],
            };
          }
        });
      });

      return tags;
    },
    []
  );

  const tags = aggregateTags(data.questions, data.answers);

  return (
    <div className="flex space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
      <div className="flex flex-col space-y-4">
        <div>
          <Stats
            questionsCount={data.questions.length}
            answersCount={data.answers.length}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-grow">
        <About description={data.description} setActiveTab={setActiveTab} />

        <TopTags tags={tags} />
      </div>
    </div>
  );
};
