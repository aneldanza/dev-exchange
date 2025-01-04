import { TopNavigationBar } from "../header/TopNavigationBar";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b-appGray-100 border-x-0 border-t-2 border-t-appOrange border-b">
      <TopNavigationBar />
    </div>
  );
};
