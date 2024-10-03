import { useNavigate } from "react-router-dom";
import { HomeIcon, UsersIcon, TagIcon } from "@heroicons/react/20/solid";
import Button from "../common/Button";

interface MenuProps {
  handleOptionSelect?: () => void;
}

export const Menu: React.FC<MenuProps> = ({ handleOptionSelect }) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
    handleOptionSelect && handleOptionSelect();
  };

  return (
    <ul className="menu list space-y-2 text-sm">
      <li className="menu-item">
        <Button
          title="Home"
          onClick={handleClick.bind(null, "/")}
          icon={<HomeIcon className="w-4" />}
        />
      </li>
      <li className="menu-item">
        <Button
          title="Users"
          onClick={handleClick.bind(null, "/users")}
          icon={<UsersIcon className="w-4" />}
        />
      </li>
      <li className="menu-item">
        <Button
          title="Tags"
          onClick={handleClick.bind(null, "/tags")}
          icon={<TagIcon className="w-4" />}
        />
      </li>
    </ul>
  );
};
