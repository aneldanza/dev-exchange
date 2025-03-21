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
import SearchInput from "../common/SearchInput";
import { Sidebar } from "./SideBar";
import landscapeLogo from "../../assets/dev exchange logo - landscape.svg";
import smallLogo from "../../assets/logo-small.svg";

export const TopNavigationBar: React.FC = () => {
  const [logOut] = useSignOutMutation();
  const { user, clearUser } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = useCallback(async () => {
    await logOut("").unwrap();

    clearUser();
  }, [logOut, clearUser]);

  const toggleSideBar = useCallback(() => {
    setIsSideBarOpen((prev) => !prev);
  }, []);

  return (
    <nav className="app-container">
      <div className="relative">
        <div className="flex flex-row w-full items-center gap-4 h-full border-b-1 text-xs justify-between py-2 pr-4 pl-2 lg:pr-6">
          <div className="flex gap-4 items-center sm:hidden">
            <div className=" h-full flex items-center justify-center shrink-0">
              {isSideBarOpen ? (
                <XMarkIcon
                  className="icon "
                  onClick={toggleSideBar}
                  aria-label="Close sidebar"
                />
              ) : (
                <Bars3Icon
                  className="icon"
                  onClick={toggleSideBar}
                  aria-label="Open sidebar"
                />
              )}
            </div>

            <div
              className="cursor-pointer shrink-0"
              onClick={() => navigate("/")}
            >
              <img src={smallLogo} alt="Logo" className="block h-11 w-auto" />
            </div>
          </div>

          <div className="cursor-pointer shrink " onClick={() => navigate("/")}>
            <img
              src={landscapeLogo}
              alt="Logo"
              className="hidden sm:block h-11 w-auto"
            />
          </div>

          <div className="hidden sm:block w-2/3">
            <SearchInput
              handleSearch={(values: { search: string }) => {
                navigate(`/search?q=${values.search}`);
              }}
            />
          </div>

          <nav className="flex shrink-0 gap-4 items-center justify-between">
            <div className={`sm:hidden h-full`}>
              <MagnifyingGlassIcon
                className={`icon ${showSearchBar && "text-blue-500"}`}
                onClick={() => setShowSearchBar((prev) => !prev)}
                aria-label="Toggle search bar"
              />
            </div>

            {user ? (
              <>
                <Link
                  to={`/users/${user.id}`}
                  className="font-semibold cursor-pointer"
                >
                  <Avatar name={user.username} size="36px" round="7px" />
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
