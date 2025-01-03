import { useEffect, useState } from "react";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { useSearchUserPostsQuery } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import PostsList from "../posts/PostsList";
import { sortItems } from "../../services/utils";
import Button from "../common/Button";
import { sortTabs } from "../common/constants";
import { ListSubheader } from "../common/ListSubheader";

const UserPostsByTagWithLoadingAndError = withLoading(
  withError(PostsList, CustomError),
  CustomLoading
);

const UserPostsByTagPage = () => {
  const { userId } = useParams<{
    userId: string;
  }>();
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get("tag") || "";
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>(sortTabs[0]);

  const {
    data: posts,
    error,
    isLoading,
  } = useSearchUserPostsQuery({
    id: userId || "",
    tag: tag,
  });

  const [sortedPosts, setSortedPosts] = useState(posts || []);

  useEffect(() => {
    if (posts && sortedPosts.length === 0) {
      setSortedPosts(posts);
    }

    if (posts && selectedTab) {
      const sorted = sortItems(posts, selectedTab);
      setSortedPosts(sorted);
    }
  }, [posts, selectedTab, sortedPosts.length]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl">Search Results</h1>
        <Button
          title="Ask a Question"
          onClick={() => navigate("/questions/new")}
          className="btn btn-primary"
        />
      </div>

      <div className="text-sm text-gray-500 mb-6">
        Results tagged with: <strong>{tag}</strong>
      </div>

      <ListSubheader
        count={posts ? posts.length : 0}
        keyword="result"
        sortTabs={sortTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <UserPostsByTagWithLoadingAndError
        isLoading={isLoading}
        error={error}
        items={sortedPosts}
      />
    </div>
  );
};

export default UserPostsByTagPage;
