import React from "react";
import { useParams } from "react-router-dom";
import { useShowFullUserInfoQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { UserProfile } from "./UserProfile";
import { FullUserData } from "./types";

interface UserPageProps {}

// TODO: re-fecth data when current user changes

// First, wrap MyComponent with withError, then pass the resulting component to withLoading
const UserProfileWithErrorAndLoading = withLoading(
  withError<{ data: FullUserData }>(UserProfile, CustomError),
  CustomLoading
);

export const UserPage: React.FC<UserPageProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading } = useShowFullUserInfoQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <UserProfileWithErrorAndLoading
      data={data}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default UserPage;
