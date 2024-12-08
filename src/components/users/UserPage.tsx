import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShowFullUserInfoQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { UserProfile } from "./UserProfile";
import { UserContext } from "./UserContext";
import { LimitedQuestionData } from "../questions/types";
import { PostData } from "./types";
import { TagData } from "../tags/types";

const options = ["profile", "activity", "settings"];

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

  const [activeTab, setActiveTab] = useState("activity");

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get("tab") || "";
      if (options.includes(tab)) {
        setActiveTab(tab);
      }
    };

    window.addEventListener("popstate", handlePopState);

    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab") || "";
    if (!tab) {
      window.history.pushState({}, "", `?tab=${activeTab}`);
    }

    if (options.includes(tab)) {
      setActiveTab(tab);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeTab]);

  const aggregateTags = useCallback(
    (questions: LimitedQuestionData[], answers: PostData[]) => {
      const tags: Record<
        string,
        { tag: TagData; posts: (LimitedQuestionData | PostData)[] }
      > = {};

      const posts = [...questions, ...answers];

      posts.forEach((post) => {
        post.tags.forEach((tag) => {
          if (tags[tag.id]) {
            (tags[tag.id].posts as (LimitedQuestionData | PostData)[]).push(
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
    <UserContext.Provider
      value={{ fullUserData: data, postsByTag, activeTab, setActiveTab }}
    >
      <UserProfileWithErrorAndLoading error={error} isLoading={isLoading} />
    </UserContext.Provider>
  );
};

export default UserPage;
