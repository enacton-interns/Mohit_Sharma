import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const MobileMenu = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = theme === "light";
  const { pathname: currentPath } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className={clsx(
          "p-2 rounded-md border",
          isLight
            ? "text-gray-700 border-gray-400"
            : "text-white border-gray-600"
        )}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-16 right-4 w-48 p-4 rounded-lg shadow-lg z-40",
            isLight ? "bg-white text-gray-800" : "bg-gray-900 text-gray-100"
          )}
        >
          <ul className="space-y-3">
            {navLinks.map(({ name, href }) => {
              const isActive = currentPath === href;
              return (
                <li key={name}>
                  <Link
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "block font-medium hover:text-orange-500",
                      isActive && "text-orange-500"
                    )}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
