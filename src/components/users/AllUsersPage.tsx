import React from "react";
import { useGetAllUsersQuery } from "../../services/api";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { UserInfoLimited } from "../../services/AuthContext";
import UsersList from "./UsersList";

const UsersListWithErrorAndLoading = withLoading(
  withError<{ users: UserInfoLimited[] }>(UsersList, CustomError),
  CustomLoading
);

export const AllUsersPage: React.FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery(undefined);

  return (
    <div>
      <h1 className="text-2xl">Users</h1>
      <UsersListWithErrorAndLoading
        users={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};
