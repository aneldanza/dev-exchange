import React, { useCallback } from "react";
import { FullUserData, UserAnswerData } from "./types";
import { formatCountString } from "../../services/utils";
import { RichContent } from "../common/RichContent";
import { TagData } from "../tags/types";
import { Tag } from "../tags/Tag";
import { QuestionData } from "../questions/types";

interface ProfileTabProps {
  data: FullUserData;
  setActiveTab: (tab: string) => void;
}

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
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-lg">Stats</div>
        <div className="card">
          <div className="flex gap-4">
            <div className="list">
              <div>{data.answers.length}</div>
              <div className="text-xs text-appGray-100">
                {
                  formatCountString(
                    data.answers.length,
                    "answer",
                    "answers"
                  ).split(" ")[1]
                }
              </div>
            </div>
            <div className="list">
              <div>{data.questions.length}</div>
              <div className="text-xs text-appGray-100">
                {
                  formatCountString(
                    data.questions.length,
                    "question",
                    "questions"
                  ).split(" ")[1]
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-lg">About</div>
        {data.description ? (
          <RichContent body={data.description} />
        ) : (
          <div className="card">
            <div className="text-appGray-100 text-sm">
              Your about me section is empty. Would you like to add something?
              🤔{" "}
              <span
                onClick={() => setActiveTab("Settings")}
                className="hyperlink"
              >
                Edit Profile
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="">
        <div className="mb-2 text-lg">Tags</div>
        <div className="activity-card">
          {Object.keys(tags).length ? (
            Object.values(tags).map((tag) => (
              <div className="activity-card-row items-center" key={tag.tag.id}>
                <Tag key={tag.tag.id} tag={tag.tag} />
                <div className="text-xs">
                  {formatCountString(tag.posts.length, "post", "posts")}
                </div>
              </div>
            ))
          ) : (
            <div>No tags found</div>
          )}
        </div>
      </div>
    </div>
  );
};
