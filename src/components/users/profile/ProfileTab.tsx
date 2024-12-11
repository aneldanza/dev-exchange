import React, { useContext, useMemo } from "react";
import { FullUserData } from "../types";
import { formatCountString } from "../../../services/utils";
import { RichContent } from "../../common/RichContent";
import { TopItemsCard } from "../TopItemsCard";
import { TagItem } from "../TagItem";
import { UserContext, type PostsByTag } from "../UserContext";
import { useAuth } from "../../../services/storeHooks";

interface ProfileTabProps {
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
  userId: number;
}> = ({ description, setActiveTab, userId }) => {
  const { user } = useAuth();

  return (
    <div>
      <div className="text-lg">About</div>
      {description ? (
        <RichContent body={description} />
      ) : (
        <div className="card">
          {user && user.id === userId ? (
            <div className="text-appGray-100 text-sm">
              Your about me section is empty. Would you like to add something?
              🤔{" "}
              <span
                onClick={() => setActiveTab("settings")}
                className="hyperlink"
              >
                Edit Profile
              </span>
            </div>
          ) : (
            <div className="text-appGray-100 text-sm activity-card-row">
              This user has not added an about me section
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ProfileTab: React.FC<ProfileTabProps> = ({ setActiveTab }) => {
  const { postsByTag, fullUserData } = useContext(UserContext);
  const { questions, answers, id, description } = fullUserData as FullUserData;

  const sortedItems = useMemo(
    () =>
      Object.values(postsByTag).sort((a, b) => b.posts.length - a.posts.length),
    [postsByTag]
  );

  return (
    <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
      <div className="flex flex-col space-y-4">
        <div>
          <Stats
            questionsCount={questions.length}
            answersCount={answers.length}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-grow">
        <About
          description={description}
          setActiveTab={setActiveTab}
          userId={id}
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
    </div>
  );
};
