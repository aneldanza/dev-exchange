import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon, TagIcon } from "@heroicons/react/20/solid";
import Button from "../common/Button";

interface MenuProps {
  handleOptionSelect?: () => void;
}

export const Menu: React.FC<MenuProps> = ({ handleOptionSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenuSection, setCurrentMenuSection] = useState("home");

  useEffect(() => {
    // remove trailing slash
    const path = window.location.pathname.replace(/\/$/, "");
    switch (path) {
      case "/":
        setCurrentMenuSection("home");
        break;
      case "/users":
        setCurrentMenuSection("users");
        break;
      case "/tags":
        setCurrentMenuSection("tags");
        break;
      default:
        setCurrentMenuSection("home");
    }
  }, [location.pathname]);

  const handleClick = (url: string) => {
    navigate(url);
    handleOptionSelect && handleOptionSelect();
  };

  return (
    <ul className="menu list space-y-2 text-sm shadow-sm">
      <li
        className={`menu-item ${currentMenuSection === "home" ? "active" : ""}`}
        onClick={handleClick.bind(null, "/")}
      >
        <Button
          title="Home"
          onClick={() => {}}
          icon={<HomeIcon className="w-4" />}
        />
      </li>
      <li
        className={`menu-item ${
          currentMenuSection === "users" ? "active" : ""
        }`}
        onClick={handleClick.bind(null, "/users")}
      >
        <Button
          title="Users"
          onClick={() => {}}
          icon={<UsersIcon className="w-4" />}
        />
      </li>
      <li
        className={`menu-item ${currentMenuSection === "tags" ? "active" : ""}`}
        onClick={handleClick.bind(null, "/tags")}
      >
        <Button
          title="Tags"
          onClick={() => {}}
          icon={<TagIcon className="w-4" />}
        />
      </li>
    </ul>
  );
};
