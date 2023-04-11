import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { appName } from "../utils"
import Avatar from "boring-avatars"
import { AnimatePresence, motion } from "framer-motion"

export default function Navbar({ bidderId }) {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Properties",
      path: "/properties",
    },
    {
      name: "Bank",
      path: "/bank",
    },
    {
      name: "About",
      path: "/about",
    },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-2xl shadow-slate-400/30">
      <div
        className="max-w-screen-xl flex flex-wrap items-center 
      justify-between mx-auto p-4"
      >
        <Link to={"/"} className="flex items-center">
          <motion.svg
            whileHover={{ scale: 1.1 }}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            ></path>
          </motion.svg>

          <motion.span
            whileDrag={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{
              duration: 0.7,
              type: "spring",
              bounce: 0.7,
            }}
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            {appName}
          </motion.span>
        </Link>
        {/* User icon */}
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 relative rounded-full md:mr-0 
            focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            aria-expanded="false"
          >
            <span className="sr-only">Open user menu</span>
            <Avatar
              size={40}
              name={bidderId}
              variant="beam"
            />
          </button>
          {isOpen && (
            <div
              className="z-50 my-4 text-base list-none bg-white divide-y absolute right-10 top-10
              divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bidder ID: {bidderId}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {bidderId}@homefinder
                </span>
              </div>
              <ul
                className="py-2"
                aria-labelledby="user-menu-button"
              >
                <li>
                  <button
                    disabled
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </button>
                </li>
              </ul>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 mx-1 text-sm text-gray-500 rounded-lg md:hidden 
            hover:bg-gray-100 focus:outline-none focus:ring-2 
            focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          border-gray-100 rounded-lg bg-gray-50 md:flex-row 
          md:space-x-8 md:mt-0 md:border-0 
          md:bg-white dark:bg-gray-800 gap-2
          md:dark:bg-gray-900 dark:border-gray-700"
            >
              {links.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-blue-700 hover:bg-blue-800 text-white hover:text-gray-100 hover:md:text-blue-900 md:text-blue-700 md:bg-blue-300/20"
                          : "hover:bg-gray-200/70"
                      } block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-grey-700 md:p-0 
                      md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent
                      md:py-3 md:px-6 md:hover:bg-gray-200/70  
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
      </div>
    </nav>
  )
}
