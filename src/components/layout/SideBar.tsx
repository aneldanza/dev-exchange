import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, UsersIcon, TagIcon } from "@heroicons/react/20/solid";
import Button from "../common/Button";

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute bg-white py-6 left-0 shadow-md">
      <ul className="menu list space-y-2 text-sm w-64 ">
        <li className="menu-item">
          <Button
            title="Home"
            onClick={() => navigate("/")}
            icon={<HomeIcon className="w-4" />}
          />
        </li>
        <li className="menu-item">
          <Button
            title="Users"
            onClick={() => navigate("/users")}
            icon={<UsersIcon className="w-4" />}
          />
        </li>
        <li className="menu-item">
          <Button
            title="Tags"
            onClick={() => navigate("/tags")}
            icon={<TagIcon className="w-4" />}
          />
        </li>
      </ul>
    </div>
  );
};
