import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building,
  Home,
  IndianRupee,
  LogOut,
  MapPin,
  PlusCircle,
  Star,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { logout } from "@redux/slices/authSlice.js";

// `tab: true` items are shown in the mobile bottom bar; the rest live in the account menu.
const NAV = {
  owner: [
    { to: "/owner", label: "Overview", icon: Home, end: true, tab: true },
    { to: "/owner/bookings", label: "Bookings", icon: Ticket, tab: true },
    { to: "/owner/turfs", label: "Turfs", icon: MapPin, tab: true },
    { to: "/owner/reviews", label: "Reviews", icon: Star, tab: true },
    { to: "/owner/add-turf", label: "Add turf", icon: PlusCircle, tab: true },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: Home, end: true, tab: true },
    { to: "/admin/owner-requests/new", label: "Requests", icon: UserPlus, match: "/admin/owner-requests", tab: true },
    { to: "/admin/users", label: "Users", icon: Users, tab: true },
    { to: "/admin/turfs", label: "Turfs", icon: MapPin, tab: true },
    { to: "/admin/transactions", label: "Payments", icon: IndianRupee, tab: true },
    { to: "/admin/owners", label: "Owners", icon: Building },
    { to: "/admin/admin-add-turf", label: "Add turf", icon: PlusCircle },
  ],
};

const isActive = (item, pathname) =>
  item.end ? pathname === item.to : pathname.startsWith(item.match ?? item.to);

const AppShell = () => {
  const role = useSelector((state) => state?.auth?.role) === "admin" ? "admin" : "owner";
  const items = NAV[role];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const itemClass =
    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-base-200";

  return (
    <div className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <div
          className={`pointer-events-auto mx-auto flex max-w-screen-xl items-center gap-2 rounded-full border border-base-300 bg-base-100/80 py-1.5 pl-3.5 pr-2 backdrop-blur-md transition-shadow ${
            scrolled ? "shadow-xl" : "shadow-sm"
          }`}
        >
          <Link to={items[0].to} className="mr-auto flex items-center gap-2 lg:mr-0">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
            <span className="font-display text-2xl font-bold">TurfUp</span>
            <span className="badge badge-sm capitalize">{role}</span>
          </Link>

          <nav aria-label="Main" className="mx-auto hidden gap-0.5 rounded-full bg-base-200 p-1 lg:flex">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                  isActive(item, pathname) ? "bg-base-100 shadow" : "opacity-70 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeSwitcher />
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold uppercase text-white"
            >
              {role[0]}
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
              >
                {items
                  .filter((i) => !i.tab)
                  .map(({ to, label, icon: Icon }) => (
                    <Link key={to} role="menuitem" to={to} className={`${itemClass} lg:hidden`}>
                      <Icon size={16} className="opacity-60" /> {label}
                    </Link>
                  ))}
                <button role="menuitem" onClick={handleLogout} className={itemClass}>
                  <LogOut size={16} className="opacity-60" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 pb-24 pt-20 lg:pb-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-base-300 bg-base-100 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {items
          .filter((i) => i.tab)
          .map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${
                isActive(item, pathname) ? "text-primary" : "opacity-60"
              }`}
            >
              <item.icon size={22} />
              {item.label}
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default AppShell;
