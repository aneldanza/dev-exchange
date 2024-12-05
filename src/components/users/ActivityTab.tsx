import { useContext, useMemo } from "react";
import { QuestionData } from "../questions/types";
import { PostsByTag, UserContext } from "./UserContext";
import { FullUserData } from "./types";
import { TopItemsCard } from "./TopItemsCard";
import { TagItem } from "./TagItem";
import { PostItem } from "./PostItem";

export const ActivityTab = () => {
  // Implement the logic for the ActivityTab component here

  const { postsByTag, fullUserData } = useContext(UserContext);
  const { questions, id } = fullUserData as FullUserData;

  const sortedItems = useMemo(
    () =>
      Object.values(postsByTag).sort((a, b) => b.posts.length - a.posts.length),
    [postsByTag]
  );

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
