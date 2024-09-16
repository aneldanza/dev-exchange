import React from "react";
import { UserInfoLimited } from "../../services/AuthContext";

interface UsersListProps {
  users: UserInfoLimited[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.username}</span> - <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
