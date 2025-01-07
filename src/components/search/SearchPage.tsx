import { useState } from "react";
import { Pagination } from "flowbite-react";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import PostsList from "../posts/PostsList";
import { useSearchAllPostsQuery } from "../../services/api";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { formatCountString } from "../../services/utils";
import { SortTabs } from "../common/SortTabs";
import { sortTabs, defaultPageSize } from "../common/constants";
import { paginationTheme } from "../../flowbiteCustomTheme";

const PostsWithLoadingAndError = withLoading(
  withError(PostsList, CustomError),
  CustomLoading
);

const SearchPageContainer = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get("q") || "";
  const [selectedTab, setSelectedTab] = useState<string>(sortTabs[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const { data, error, isLoading } = useSearchAllPostsQuery(
    {
      value: q,
      page: currentPage,
      sort: selectedTab.toLowerCase(),
      limit: defaultPageSize,
    },
    { refetchOnMountOrArgChange: true }
  );
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between mb-6 items-center">
        <h1 className="page-header">Search Results</h1>
        <Button
          title="Ask a Question"
          onClick={() => navigate("/questions/new")}
          className="btn btn-primary"
        />
      </div>
      <div className="text-sm text-gray-500 mb-6">
        Results for: <strong>{q}</strong>
      </div>
      <div>
        <div className="flex justify-between border-b p-2 pb-6 items-center mb-6">
          <div className="font-bold text-sm">
            {formatCountString(
              data ? data.total_results : 0,
              "result",
              "results"
            )}
          </div>
          <div className="text-xs">
            <SortTabs
              sortOptions={sortTabs}
              selectedOption={selectedTab}
              setSelectedOption={setSelectedTab}
            />
          </div>
        </div>
        <PostsWithLoadingAndError
          items={data ? data.posts : undefined}
          error={error}
          isLoading={isLoading}
        />
        {data && data.total_results > defaultPageSize && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={data?.total_pages || 0}
              onPageChange={handlePageChange}
              color="gray"
              theme={paginationTheme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPageContainer;
