import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import moment from "moment";
import { UserInfoLimited } from "./types";

interface UsersListProps {
  users: UserInfoLimited[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const navigate = useNavigate();

  if (!users.length) {
    return (
      <div className="flex justify-center text-center text-lg py-6 m-auto">
        No users found
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex gap-3 cursor-pointer"
            onClick={() => {
              navigate(`/users/${user.id}`);
            }}
          >
            <Avatar name={user.username} size="50px" round="7px" />
            <div className="space-y-1 font-medium text-appGray-500">
              <div>{user.username}</div>
              <div className="text-sm text-gray-500">
                {`Joined in ${moment(user.created_at).format("MMMM YYYY")}`}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
