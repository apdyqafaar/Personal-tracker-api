import React from "react";
import { Link, NavLink } from "react-router";
import useAthStore from "../../store/UserAuthStore";
import { RightSideMenu } from "./RightSideMenu";

export const Header = () => {
  const { user, isAuthenticated } = useAthStore();
  return (
    <div className="py-3 shadow-sm px-2 sm:px-4 bg-background">
      <div className="w-full sm:max-w-7xl mx-auto ">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt=""
              className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
            />
            <Link
              to={"/"}
              className="text-foreground capitalize font-medium sm:text-lg"
            >
              Finance Tracker
            </Link>
          </div>

          {/* navigation menues */}
          {isAuthenticated && (
            <div className=" hidden md:block ">
              <div className="flex items-center gap-6">
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `relative text-sm md:text-base capitalize text-foreground pb-1 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
     hover:after:w-full 
     ${isActive ? "font-medium after:w-full" : ""}`
                  }
                >
                  Transactions
                </NavLink>

                <NavLink
                  to={"/analytics"}
                  className={({ isActive }) =>
                    `relative text-sm md:text-base capitalize text-foreground pb-1 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
     hover:after:w-full 
     ${isActive ? "font-medium after:w-full" : ""}`
                  }
                >
                  Analytics
                </NavLink>
                <NavLink
                  to={"/income"}
                  className={({ isActive }) =>
                    `relative text-sm md:text-base capitalize text-foreground pb-1 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
     hover:after:w-full 
     ${isActive ? "font-medium after:w-full" : ""}`
                  }
                >
                  Income
                </NavLink>
                <NavLink
                  to={"/expense"}
                  className={({ isActive }) =>
                    `relative text-sm md:text-base capitalize text-foreground pb-1 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
     hover:after:w-full 
     ${isActive ? "font-medium after:w-full" : ""}`
                  }
                >
                  Expenses
                </NavLink>
              </div>
            </div>
          )}

          {/* right side navigations and user profile */}
          <RightSideMenu/>
        </div>
      </div>
    </div>
  );
};
