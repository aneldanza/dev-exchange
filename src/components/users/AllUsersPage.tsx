import React from "react";
import { useGetAllUsersQuery } from "../../services/api";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { FullUserData } from "./types";
import UsersList from "./UsersList";

const UsersListWithErrorAndLoading = withLoading(
  withError<{ users: FullUserData[] }>(UsersList, CustomError),
  CustomLoading
);

export const AllUsersPage: React.FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <h1 className="text-2xl mb-6">Users</h1>
      <UsersListWithErrorAndLoading
        users={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};
