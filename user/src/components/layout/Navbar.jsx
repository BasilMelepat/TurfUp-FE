import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Search, Store, Ticket } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { logout } from "../../redux/slices/authSlice";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "U";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const base = isLoggedIn ? "/auth" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    setMenuOpen(false);
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const links = [
    { to: isLoggedIn ? "/auth" : "/", label: "Home", end: true },
    { to: `${base}/turfs`, label: "Turfs" },
    ...(isLoggedIn ? [{ to: "/auth/booking-history", label: "Bookings" }] : []),
  ];

  const itemClass =
    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-base-200";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
      <div
        className={`pointer-events-auto mx-auto flex max-w-screen-xl items-center gap-2 rounded-full border border-base-300 bg-base-100/80 py-1.5 pl-3.5 pr-2 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-xl" : "shadow-sm"
        }`}
      >
        <Link to={isLoggedIn ? "/auth" : "/"} className="mr-auto flex items-center gap-2 lg:mr-0">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
          <span className="font-display text-2xl font-bold">TurfUp</span>
        </Link>

        <nav aria-label="Main" className="mx-auto hidden gap-0.5 rounded-full bg-base-200 p-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  isActive ? "bg-base-100 shadow" : "opacity-70 hover:opacity-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to={`${base}/turfs?search=1`} className="btn btn-ghost btn-circle btn-sm" aria-label="Search turfs">
          <Search size={18} />
        </Link>
        <ThemeSwitcher />

        {isLoggedIn ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-white"
            >
              {initials(user?.name)}
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
              >
                <div className="px-3 py-2 text-sm">
                  <b>{user?.name || "My account"}</b>
                  {user?.email && <div className="opacity-70">{user.email}</div>}
                </div>
                <hr className="my-1 border-base-300" />
                <Link role="menuitem" to="/auth/booking-history" onClick={() => setMenuOpen(false)} className={itemClass}>
                  <Ticket size={16} className="opacity-60" /> My bookings
                </Link>
                <Link role="menuitem" to="/auth/become-owner" onClick={() => setMenuOpen(false)} className={itemClass}>
                  <Store size={16} className="opacity-60" /> Become an owner
                </Link>
                <hr className="my-1 border-base-300" />
                <button role="menuitem" onClick={handleLogout} className={itemClass}>
                  <LogOut size={16} className="opacity-60" /> Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm rounded-full px-5 text-white">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
