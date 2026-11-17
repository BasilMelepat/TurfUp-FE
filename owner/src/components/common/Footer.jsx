import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const USER_SITE = "https://turf-up-user.vercel.app";
const linkClass = "flex items-center gap-1.5 py-1.5 text-[#e8f1ea]/85 hover:text-white hover:underline";

const Footer = () => (
  <footer className="relative isolate mx-3 mb-4 mt-10 overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#0f4a24,#0b2415)] px-5 pb-4 pt-7 text-[#e8f1ea] sm:mx-4 sm:px-7">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_140%_at_100%_0,rgba(20,163,75,.27),transparent_55%)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full border-[3px] border-white/10"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 top-14 -z-10 w-64 border-t-[3px] border-white/10"
    />

    <div className="mx-auto flex max-w-screen-xl flex-col gap-6 sm:flex-row sm:justify-between sm:gap-8">
      <div>
        <Link to="/" className="mb-2.5 flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-full" />
          <span className="font-display text-3xl font-bold">TurfUp</span>
        </Link>
        <p className="mb-4 max-w-[300px] opacity-80">
          Manage turfs, bookings and payments in one place.
        </p>
        <Link to="/login" className="btn btn-primary btn-sm gap-1.5">
          Owner log in <ArrowRight size={16} />
        </Link>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-9">
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-green-300">Get started</h4>
          <Link to="/login" className={linkClass}>
            Log in
          </Link>
          <Link to="/signup" className={linkClass}>
            Sign up
          </Link>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-green-300">TurfUp</h4>
          <a href={USER_SITE} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Book a turf <ExternalLink size={14} />
          </a>
        </div>
      </nav>
    </div>

    <div className="mx-auto mt-6 flex max-w-screen-xl flex-wrap justify-between gap-2 border-t border-white/10 pt-3.5 text-sm text-white/70">
      <span>&copy; {new Date().getFullYear()} TurfUp. All rights reserved.</span>
      <span>
        Developed by{" "}
        <a
          href="https://github.com/basilmelepat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-300 hover:underline"
        >
          Basil Melepat
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
