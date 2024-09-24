import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSignOutMutation } from "../../services/api";
import { useAuth } from "../../services/storeHooks";
import { SideBar } from "./SideBar";

export const Header = () => {
  const [logOut] = useSignOutMutation();
  const { user, setUser } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      const result = await logOut("").unwrap();
      console.log(result);
      setUser(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      if (e.status === 401) {
        console.log(e.data.message);
        setUser(null);
      }
    }
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-row w-full items-center space-x-3 p-2 border-b-1 text-xs justify-between">
        <div className="sm:max-2xl:hidden">
          {isSideBarOpen ? (
            <XMarkIcon
              className="size-6 cursor-pointer"
              onClick={toggleSideBar}
            />
          ) : (
            <Bars3Icon
              className="size-6 cursor-pointer"
              onClick={toggleSideBar}
            />
          )}
        </div>

        <div className="text-blue ">Logo</div>
        <nav className="flex shrink-0 space-x-2 items-center justify-between">
          <div className="">Search Icon</div>
          {user ? (
            <>
              <Link
                to={`/users/${user.id}`}
                className="font-semibold cursor-pointer"
              >
                {user.username}
              </Link>

              <button className="btn-secondary" onClick={handleLogOut}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="btn-secondary">
                Log in
              </Link>
              <Link to={"/signup"} className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>

      {isSideBarOpen && <SideBar />}
    </div>
  );
};
