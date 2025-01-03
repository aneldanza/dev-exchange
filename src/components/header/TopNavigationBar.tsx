import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSignOutMutation } from "../../services/api";
import { useAuth } from "../../services/storeHooks";
import SearchInput from "./SearchInput";
import { Sidebar } from "./SideBar";
import longLogo from "../../assets/logo-long.svg";

export const TopNavigationBar: React.FC = () => {
  const [logOut] = useSignOutMutation();
  const { user, setUser } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = useCallback(async () => {
    await logOut("").unwrap();

    setUser(null);
  }, [logOut, setUser]);

  const toggleSideBar = useCallback(() => {
    setIsSideBarOpen((prev) => !prev);
  }, []);

  return (
    <nav className="border-b-appGray-100 border-x-0 border-t-2 border-t-appOrange border-b sticky">
      <div className="relative mx-auto">
        <div className="flex flex-row w-full items-center space-x-3 h-full border-b-1 text-xs justify-between py-2 pr-2">
          <div className="sm:hidden h-full flex items-center justify-center shrink-0 px-2">
            {isSideBarOpen ? (
              <XMarkIcon
                className="size-6 cursor-pointer"
                onClick={toggleSideBar}
                aria-label="Close sidebar"
              />
            ) : (
              <Bars3Icon
                className="size-6 cursor-pointer"
                onClick={toggleSideBar}
                aria-label="Open sidebar"
              />
            )}
          </div>

          <div
            className="cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <img src={longLogo} alt="Logo" className="block h-12 w-auto" />
          </div>

          <div className={`sm:hidden h-full`}>
            <MagnifyingGlassIcon
              className={`size-6 cursor-pointer ${
                showSearchBar && "text-blue-500"
              }`}
              onClick={() => setShowSearchBar((prev) => !prev)}
              aria-label="Toggle search bar"
            />
          </div>
          <div className="hidden sm:block w-2/3">
            <SearchInput
              handleSearch={(values: { search: string }) => {
                navigate(`/search?q=${values.search}`);
              }}
            />
          </div>
          <nav className="flex shrink-0 space-x-2 items-center justify-between">
            {user ? (
              <>
                <Link
                  to={`/users/${user.id}`}
                  className="font-semibold cursor-pointer"
                >
                  <Avatar name={user.username} size="40px" round="7px" />
                </Link>

                <button className="btn btn-secondary" onClick={handleLogOut}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-secondary">
                  Log in
                </Link>
                <Link to={"/signup"} className="btn btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>

        <Sidebar isOpen={isSideBarOpen} toggle={toggleSideBar} />

        {showSearchBar && (
          <div className="sm:hidden absolute w-full left-0 bg-appGray-50 py-2 px-2 flex">
            <div className="w-full">
              <SearchInput
                handleSearch={(values: { search: string }) => {
                  navigate(`/search?q=${values.search}`);
                  setShowSearchBar(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigationBar;
