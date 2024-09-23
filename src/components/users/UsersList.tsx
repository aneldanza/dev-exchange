import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { UserInfoLimited } from "../../services/AuthContext";

interface UsersListProps {
  users: UserInfoLimited[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex gap-3"
            onClick={() => {
              navigate(`/users/${user.id}`);
            }}
          >
            <div className="flex flex-wrap gap-2 align-middle items-center">
              <Avatar rounded bordered className="bg-appGray-50" img="" />
            </div>

            <div className="space-y-1 font-medium text-appGray-500">
              <div>{user.username}</div>
              <div className="text-sm text-gray-500">Joined in August 2014</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
