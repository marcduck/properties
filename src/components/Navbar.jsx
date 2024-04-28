import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { appName, cents, links } from "../utils";
import Avatar from "boring-avatars";
import { AnimatePresence, motion } from "framer-motion";
import UserMenu from "./UserMenu";

export default function Navbar({ bidderId, balance }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`backdrop-blur-sm border-gray-200 
      dark:bg-gray-900 bg-white/90 dark:bg-gray-800/90 shadow-xl 
    shadow-stone-400/20 dark:shadow-black/20  px-4 fixed top-0 z-20 w-full py-2
    `}
    >
      <motion.div
        className={`max-w-screen-xl  flex flex-wrap items-center 
      justify-between mx-auto  h-full px-4 md:px-0`}
      >
        <Link
          reloadDocument
          to={"/"}
          className="flex items-center "
          onClick={() => window.scrollTo(0, 0)}
        >
          <motion.svg
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.9,
              type: "spring",
              bounce: 0.7,
            }}
            className="h-8 mr-3"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            ></path>
          </motion.svg>

          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {appName}
          </span>
        </Link>
        {/* User icon */}
        <div className="flex items-center md:order-2 group relative">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 relative rounded-full md:mr-0 
            focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <span className="sr-only">Open user menu</span>
            <Avatar size={30} name={bidderId} variant="beam" />
          </button>
          <AnimatePresence>
            {isOpen && <UserMenu balance={balance} bidderId={bidderId} />}
          </AnimatePresence>
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center p-2 mx-1 text-sm text-gray-500 rounded-lg md:hidden 
            hover:bg-gray-100 "
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </motion.button>
        </div>
        {
          <div
            className={`${
              !menuOpen && "hidden md:visible"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="mobile-menu-2"
          >
            <ul
              className="
          flex flex-col font-medium p-4 md:p-0 mt-4 border 
          border-gray-100 rounded-lg  md:flex-row 
          md:space-x-8 md:mt-0 md:border-0 gap-2"
            >
              {links.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? `bg-emerald-700 text-white  hover:!bg-emerald-800 md:hover:!bg-emerald-300/20 
                            md:text-emerald-800 md:bg-emerald-300/20`
                          : ""
                      } 
                      block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 
                      md:py-3 md:px-6 md:text-grey-700 hover:bg-emerald-300/30
                      transition duration-[10] ease-out dark:text-gray-200 

                      `
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        }
      </motion.div>
    </nav>
  );
}
