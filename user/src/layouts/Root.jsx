import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import BottomTabs from "../components/layout/BottomTabs";

const Root = () => (
  <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
    <Navbar />
    <main className="flex-grow pt-20 pb-16 lg:pb-0">
      <Outlet />
    </main>
    <BottomTabs />
  </div>
);

export default Root;
