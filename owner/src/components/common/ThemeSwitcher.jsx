import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { setTheme } from "../../redux/slices/themeSlice";

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.current);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => dispatch(setTheme(theme === "light" ? "dark" : "light"));

  return (
    <button
      className="btn btn-ghost btn-circle btn-sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeSwitcher;
