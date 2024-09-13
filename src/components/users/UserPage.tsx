import React from "react";
import { useParams } from "react-router-dom";
import { useShowFullUserInfoQuery } from "../../services/api";

interface UserPageProps {}

export const UserPage: React.FC<UserPageProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading, isSuccess } =
    useShowFullUserInfoQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  } else if (isSuccess) {
    return (
      <div>
        <h1>User Profile</h1>
        <p>{JSON.stringify(data)}</p>
        {/* Render the user profile information here */}
      </div>
    );
  }
};

export default UserPage;
