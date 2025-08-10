import React from 'react'
import { NavLink } from 'react-router';

export const Footer = () => {
  return (
    <footer className="w-full border-t  text-gray-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <span className="font-semibold text-gray-700">📊 Finance Tracker</span>

        <div className="flex gap-4 mt-2 sm:mt-0">
                 <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "hover:text-primary transition"
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="transactions"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "hover:text-primary transition"
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to="analytics"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "hover:text-primary transition"
            }
          >
            Analytics
          </NavLink>
        </div>

        <span className="text-gray-400 mt-2 sm:mt-0">
          &copy; {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  );
};
