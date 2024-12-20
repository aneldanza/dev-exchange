import { useContext, useMemo } from "react";
import { CustomDropdown } from "../../common/CustomDropdown";
import { LimitedQuestionData } from "../../questions/types";
import { PostsByTag, UserContext } from "../UserContext";
import { FullUserData, PostData } from "../types";
import { TagItem } from "../TagItem";
import { Summary } from "./Summary";
import { Posts } from "./Posts";
import { Post } from "./Post";
import { activityTabs } from "./constants";

export const ActivityTab = () => {
  // Implement the logic for the ActivityTab component here

  const { postsByTag, fullUserData, setActiveTab, activeTab } =
    useContext(UserContext);
  const { questions, id, answers, votes } = fullUserData as FullUserData;

  const handleTabSelect = (option: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", option);
    window.history.pushState({}, "", url);
    setActiveTab(option);
  };

  const sortedItems = useMemo(
    () =>
      Object.values(postsByTag).sort((a, b) => b.posts.length - a.posts.length),
    [postsByTag]
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex shrink-0 w-full md:hidden">
        <CustomDropdown
          options={activityTabs}
          handleOptionSelect={handleTabSelect}
          selectedOption={activeTab}
        />
      </div>
      <div className="md:w-1/4 md:max-w-40 hidden md:block shrink-0 min-w-auto">
        <ul className="list space-y-2 text-sm ">
          {activityTabs.map((option) => (
            <li
              key={option}
              className={`tab ${
                activeTab === option ? "secondary-active-tab" : "inactive-tab"
              }`}
              onClick={() => handleTabSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        {activeTab === "summary" && (
          <Summary
            questions={questions}
            answers={answers}
            id={id}
            sortedItems={sortedItems}
            votes={votes}
          />
        )}
        {activeTab === "questions" && (
          <Posts<LimitedQuestionData>
            posts={questions}
            label="Questions"
            renderItem={(question: LimitedQuestionData) => (
              <Post post={{ ...question, question_id: question.id }} />
            )}
          />
        )}
        {activeTab === "answers" && (
          <Posts<PostData>
            posts={answers}
            label="Answers"
            renderItem={(answer: PostData) => <Post post={answer} />}
          />
        )}
        {activeTab === "tags" && (
          <Posts<PostsByTag>
            posts={sortedItems}
            label="Tags"
            renderItem={(tagItem: PostsByTag) => (
              <TagItem
                tag={tagItem.tag}
                userId={id}
                postsCount={tagItem.posts.length}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};
