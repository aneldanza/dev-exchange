import { useState } from "react";
import { Pagination } from "flowbite-react";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import PostsList from "../common/PostsList";
import { useSearchAllPostsQuery } from "../../services/api";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { formatCountString } from "../../services/utils";

const paginationTheme = {
  base: "text-xs",
  pages: {
    previous: {
      base: "ml-0 rounded-l-lg border border-appGray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
    },
    next: {
      base: "rounded-r-lg border border-appGray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
    },
    selector: {
      base: "w-12 border border-appGray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
      active: "bg-appGray-50 text-appGray-500",
    },
  },
};

const PostsWithLoadingAndError = withLoading(
  withError(PostsList, CustomError),
  CustomLoading
);

const sortTabs = ["Relevance", "Newest", "Oldest", "Score"];
const pageSize = 5;

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
      limit: pageSize,
    },
    { refetchOnMountOrArgChange: true }
  );
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-xl">Search Results</h1>
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
          <div className="border rounded-md p-1 text-sm border-appGray-300">
            {sortTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`${
                  selectedTab === tab
                    ? " bg-appGray-50 rounded-sm text-appGay-500 font-medium p-1"
                    : "text-appGray-300 p-1"
                } px-2 py-1`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <PostsWithLoadingAndError
          items={data ? data.posts : undefined}
          error={error}
          isLoading={isLoading}
        />
        {data && data.total_results > pageSize && (
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
