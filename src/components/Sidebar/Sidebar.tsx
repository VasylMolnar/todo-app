import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

interface SidebarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDark, toggleTheme }) => {
  return (
    <nav
      className={`flex flex-col p-4 transition h-screen w-64 ${
        isDark ? "bg-black border-r border-white" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-start">
        <img src={logo} alt="Logo" className="max-w-17 mb-3" />
        <span className="text-2xl font-bold text-blue-600 tracking-wide">
          ToDo App
        </span>
      </div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mb-4 px-4 py-2 rounded ${
            isActive
              ? "bg-blue-600 text-white"
              : isDark
              ? "text-white"
              : "text-gray-700"
          }`
        }
      >
        Головна
      </NavLink>

      <NavLink
        to="/create"
        className={({ isActive }) =>
          `mb-4 px-4 py-2 rounded ${
            isActive
              ? "bg-blue-600 text-white"
              : isDark
              ? "text-white"
              : "text-gray-700"
          }`
        }
      >
        Новий запис
      </NavLink>
      <button
        onClick={toggleTheme}
        className="mt-auto px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
      >
        {isDark ? "Світла тема" : "Темна тема"}
      </button>
    </nav>
  );
};

export default Sidebar;
