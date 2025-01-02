import React from "react";

import { TagsList } from "./TagsList";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { useSearchTagsQuery } from "../../services/api";
import { defaultPageSize } from "../common/constants";
import SearchInput from "../header/SearchInput";
import { Pagination } from "flowbite-react";
import { paginationTheme } from "../../flowbiteCustomTheme";

const TagsListWithLoadingAndError = withLoading(
  withError(TagsList, CustomError),
  CustomLoading
);

export const TagsPage: React.FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { data, error, isLoading } = useSearchTagsQuery(
    { value: query, page: currentPage, limit: defaultPageSize },
    {
      refetchOnFocus: true,
    }
  );

  return (
    <div className="flex flex-col space-y-4 ">
      <h1 className="text-2xl">Tags</h1>
      <div className="text-sm">
        Tags are keywords or labels associated with questions that allow users
        to easily filter and search for content relevant to their interests or
        areas of expertise. This page showcases a list of all available tags,
        with each tag linking to questions that have been categorized under it.
        Users can explore various tags to find topics they are knowledgeable
        about or wish to learn more about, contributing to discussions and
        answering related questions.
      </div>

      <div>
        <SearchInput
          handleSearch={(values: { search: string }) => setQuery(values.search)}
          placeholder="Filter by tag name..."
        />
      </div>
      <TagsListWithLoadingAndError
        tags={data && data.tags ? data.tags : []}
        error={error}
        isLoading={isLoading}
      />

      {data && data.total_results > defaultPageSize && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={data?.total_pages || 0}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            color="gray"
            theme={paginationTheme}
          />
        </div>
      )}
    </div>
  );
};
