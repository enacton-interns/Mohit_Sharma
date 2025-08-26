// components/layout/Header.js
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { toggleTheme } from "../../features/theme/theme_slice.js";
import { Sun, Moon } from "lucide-react";
import MobileMenu from "../UI/navbar/MobileMenu.jsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "Charts", href: "/charts" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isLight = theme === "light";
  const { pathname: currentPath } = useLocation();

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 py-4 shadow-lg transition-all",
        isLight ? "bg-white text-gray-800" : "bg-gray-800 text-white"
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className={clsx(
            "font-semibold md:text-lg sm:text-sm",
            isLight ? "text-orange-600" : "text-orange-400"
          )}
        >
          Mental Wellness
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ name, href }) => {
            const isActive = currentPath === href;
            return (
              <li key={name}>
                <Link
                  to={href}
                  className={clsx(
                    "font-medium text-lg hover:text-orange-500",
                    isLight ? "text-gray-700" : "text-gray-300",
                    isActive && "text-orange-500"
                  )}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-3">
          <button className="hidden md:inline font-medium py-2 px-4 rounded bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
            Sign In
          </button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`font-bold p-3 rounded border cursor-pointer ${
              isLight
                ? "text-gray-700 border-gray-400 hover:bg-gray-100"
                : "text-white border-gray-600 hover:bg-gray-700"
            }`}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Nav Toggle */}
          <MobileMenu theme={theme} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
