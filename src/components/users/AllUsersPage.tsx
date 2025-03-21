import React from "react";
import { useSearchUsersQuery } from "../../services/api";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { UserInfoLimited } from "./types";
import UsersList from "./UsersList";
import SearchInput from "../common/SearchInput";
import { Pagination } from "flowbite-react";
import { defaultPageSize } from "../common/constants";
import { paginationTheme } from "../../flowbiteCustomTheme";
import UsersListSkeleton from "./UsersListSkeleton";

const UsersListWithErrorAndLoading = withLoading(
  withError<{ users: UserInfoLimited[] }>(UsersList, CustomError),
  UsersListSkeleton
);

export const AllUsersPage: React.FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { data, error, isLoading } = useSearchUsersQuery(
    { value: query, page: currentPage, limit: defaultPageSize },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="page-header">Users</h1>
      <div className="mb-6 w-2/3 text-xs relative z-10 max-w-[400px]">
        <SearchInput
          handleSearch={(values: { search: string }) => {
            setQuery(values.search);
          }}
          placeholder="Filter by username..."
        />
      </div>

      <UsersListWithErrorAndLoading
        users={data && data.users ? data.users : []}
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
