import { useContext, useMemo } from "react";
import { CustomDropdown } from "../../common/CustomDropdown";
import { UserContext } from "../UserContext";
import { FullUserData, PostsByTag } from "../types";
import { PostData } from "../../posts/types";
import { TagItem } from "../TagItem";
import { Summary } from "./Summary";
import { Posts } from "./Posts";
import { Post } from "./Post";
import { activityTabs, sortTags } from "./constants";
import { ItemsTab } from "./ItemsTab";
import { sortTabs } from "../../common/constants";

export const ActivityTab = () => {
  // Implement the logic for the ActivityTab component here

  const { fullUserData, setActiveTab, activeTab } = useContext(UserContext);
  const { questions, id, answers, votes } = fullUserData as FullUserData;

  const handleTabSelect = (option: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", option);
    window.history.pushState({}, "", url);
    setActiveTab(option);
  };

  const postsByTag = useMemo(
    () =>
      fullUserData
        ? Object.values(fullUserData.posts_by_tag).sort(
            (a, b) => b.posts.length - a.posts.length
          )
        : [],
    [fullUserData]
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
            postsByTag={postsByTag}
            votes={votes}
          />
        )}
        {activeTab === "questions" && (
          <ItemsTab<PostData>
            sortOptions={sortTabs}
            label="Question"
            items={questions}
            renderItem={({ items }: { items: PostData[] }) => (
              <Posts<PostData>
                posts={items}
                label="Question"
                renderItem={(question: PostData) => <Post post={question} />}
              />
            )}
          />
        )}
        {activeTab === "answers" && (
          <ItemsTab<PostData>
            sortOptions={sortTabs}
            label="Answer"
            items={answers}
            renderItem={({ items }: { items: PostData[] }) => (
              <Posts<PostData>
                posts={items}
                label="Answer"
                renderItem={(answer: PostData) => <Post post={answer} />}
              />
            )}
          />
        )}
        {activeTab === "tags" && (
          <ItemsTab<PostsByTag>
            sortOptions={sortTags}
            label="Tag"
            items={fullUserData?.posts_by_tag || []}
            renderItem={({ items }: { items: PostsByTag[] }) => (
              <Posts<PostsByTag>
                posts={items}
                label="Tag"
                renderItem={(tagItem: PostsByTag) => (
                  <TagItem
                    tag={tagItem.tag}
                    userId={id}
                    postsCount={tagItem.posts.length}
                  />
                )}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};
