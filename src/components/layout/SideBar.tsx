import React from "react";
import { Menu } from "./Menu";

export const SideBar: React.FC = () => {
  return (
    <div className="absolute bg-white py-6 left-0 shadow-md w-64">
      <Menu />
    </div>
  );
};
