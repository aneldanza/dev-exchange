import { Link } from "react-router-dom";
import { useSignOutMutation } from "../../services/api";
import { useAuth } from "../../AuthContext";

export const Header = () => {
  const [logOut] = useSignOutMutation();
  const { user, setUser } = useAuth();

  const handleLogOut = async () => {
    try {
      const result = await logOut("").unwrap();
      console.log(result);
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-row w-full items-center space-x-3 p-2 border-b-1 text-xs justify-between">
      <div>Menu Hamburger</div>
      <div className="text-blue ">Logo</div>
      <nav className="flex shrink-0 space-x-2 items-center justify-between">
        <div className="">Search Icon</div>
        {user ? (
          <>
            <div>{user.username}</div>
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
  );
};
