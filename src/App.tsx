import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";

export default function App() {
  return (
    <>
      <div className="font-sans ">
        <nav className="px-4">
          <Header />
        </nav>
        <main className="py-6 px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
