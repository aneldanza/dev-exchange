import { TopNavigationBar } from "../header/TopNavigationBar";

export const Header = () => {
  return (
    <div className="z-50 border-b-appGray-100 border-x-0 border-t-2 border-t-appOrange border-b sticky">
      <TopNavigationBar />
    </div>
  );
};
