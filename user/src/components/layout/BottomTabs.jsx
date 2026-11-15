import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, LogIn, MapPin, Ticket } from "lucide-react";

const BottomTabs = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const base = isLoggedIn ? "/auth" : "";
  const tabs = [
    { to: isLoggedIn ? "/auth" : "/", label: "Home", icon: Home, end: true },
    { to: `${base}/turfs`, label: "Turfs", icon: MapPin },
    isLoggedIn
      ? { to: "/auth/booking-history", label: "Bookings", icon: Ticket }
      : { to: "/login", label: "Log in", icon: LogIn },
  ];

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-base-300 bg-base-100 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {tabs.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? "text-primary" : "opacity-60"}`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomTabs;
