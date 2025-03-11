import React, { useContext } from "react";
import { FullUserData, PostsByTag } from "../types";
import { formatCountString } from "../../../services/utils";
// import { RichContent } from "../../common/RichContent";
import { TopItemsCard } from "../TopItemsCard";
import { TagItem } from "../TagItem";
import { UserContext } from "../UserContext";
import { useAuth } from "../../../services/storeHooks";
import MarkdownViewer from "../../common/MarkDownViewer";
import { sortTags } from "../../users/activity/constants";

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
      <div className="text-lg mb-2">About</div>
      {description ? (
        // <RichContent body={description} />
        <div className="card">
          <MarkdownViewer content={description} />
        </div>
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

export const ProfileTab = () => {
  const { fullUserData, setActiveTab } = useContext(UserContext);
  const { questions, answers, id, description, posts_by_tag } =
    fullUserData as FullUserData;

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
          items={posts_by_tag}
          name="tag"
          sortOptions={sortTags}
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
