import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="bg-gray-900 rounded-lg shadow m-4 mt-10">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <Link to="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/logo.png" alt="TurfUp" class="h-10"/>
                <span class="self-center text-xl normal-case whitespace-nowrap dark:text-white">TurfUp</span>
            </Link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/auth/turfs" class="from-left me-4 md:me-6">Turfs</Link>
                </li>
                <li>
                    <NavLink to="/auth/become-owner" className={({ isActive }) => (isActive ? "text-accent" : "from-left me-4 md:me-6")}>
                    Become an Owner </NavLink>
                </li>
                <li>
                    <Link to="/auth/booking-history" class="from-left">My Bookings</Link>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {new Date().getFullYear()} <Link to="/" class="from-left">TurfUp™</Link>. All Rights Reserved
        </span>
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Developed with ❤ by{" "}
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






