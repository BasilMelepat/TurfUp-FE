import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b2415] rounded-lg shadow m-4 mt-10">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/logo.png" alt="TurfUp" className="h-10"/>
                <span className="self-center text-xl normal-case whitespace-nowrap dark:text-white">TurfUp</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/auth/turfs" className="from-left me-4 md:me-6">Turfs</Link>
                </li>
                <li>
                    <NavLink to="/auth/become-owner" className={({ isActive }) => (isActive ? "text-accent" : "from-left me-4 md:me-6")}>
                    Become an Owner </NavLink>
                </li>
                <li>
                    <Link to="/auth/booking-history" className="from-left">My Bookings</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {new Date().getFullYear()} <Link to="/" className="from-left">TurfUp™</Link>. All Rights Reserved
        </span>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Developed with ❤ by{" "}
        <a href="https://github.com/basilmelepat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 from-left">
          Basil Melepat</a>
        </span>
    </div>
</footer>
  );
};

export default Footer;






