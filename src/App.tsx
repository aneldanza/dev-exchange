import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Menu } from "./components/layout/Menu";
import FooterComponent from "./components/layout/Footer";

export default function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen font-sans text-appBlack">
        <Header />

        <main className="flex flex-grow app-container">
          <div className="hidden min-w-40 max-w-64 flex-grow border py-6 border-appGray-100 border-y-0 border-l-0 sm:block">
            <Menu />
          </div>
          <div className="px-4 py-6 w-full h-full overflow-auto">
            <Outlet />
          </div>
        </main>

        <FooterComponent />
      </div>
    </>
  );
}
