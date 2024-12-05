import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useShowFullUserInfoQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { UserProfile } from "./UserProfile";
import { UserContext } from "./UserContext";
import { QuestionData } from "../questions/types";
import { UserAnswerData } from "./types";
import { TagData } from "../tags/types";

// First, wrap UserProfile with withError, then pass the resulting component to withLoading
const UserProfileWithErrorAndLoading = withLoading(
  withError(UserProfile, CustomError),
  CustomLoading
);

export const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading } = useShowFullUserInfoQuery(userId || "", {
    refetchOnMountOrArgChange: true,
  });

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

  const postsByTag = aggregateTags(data?.questions || [], data?.answers || []);

  return (
    <UserContext.Provider value={{ fullUserData: data, postsByTag }}>
      <UserProfileWithErrorAndLoading error={error} isLoading={isLoading} />
    </UserContext.Provider>
  );
};

export default UserPage;
