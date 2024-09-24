import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Menu } from "./components/layout/Menu";

export default function App() {
  return (
    <>
      <div className="font-sans text-appBlack w-full h-screen">
        <nav className="px-4 border-b-appGray-100 border">
          <Header />
        </nav>
        <main className=" flex container h-full">
          <div className="hidden min-w-40 max-w-64 grow-1 border py-6 border-appGray-100 border-t-0 sm:max-2xl:block">
            <Menu />
          </div>
          <div className="px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
