import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import BottomTabs from "../components/layout/BottomTabs";

export default function ProtectedLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
      <Navbar />
      <main className="flex-grow pt-20 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <BottomTabs />
    </div>
  );
}
