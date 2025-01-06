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
      >
        <Button
          title="Home"
          onClick={handleClick.bind(null, "/")}
          icon={<HomeIcon className="w-4" />}
        />
      </li>
      <li
        className={`menu-item ${
          currentMenuSection === "users" ? "active" : ""
        }`}
      >
        <Button
          title="Users"
          onClick={handleClick.bind(null, "/users")}
          icon={<UsersIcon className="w-4" />}
        />
      </li>
      <li
        className={`menu-item ${currentMenuSection === "tags" ? "active" : ""}`}
      >
        <Button
          title="Tags"
          onClick={handleClick.bind(null, "/tags")}
          icon={<TagIcon className="w-4" />}
        />
      </li>
    </ul>
  );
};
