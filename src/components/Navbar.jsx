import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { appName } from "../utils"
import Avatar from "boring-avatars"
import { motion } from "framer-motion"

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
      name: "About",
      path: "/about",
    },
    {
      name: "Bank",
      path: "/bank",
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
          <img
            src="./HomeModern.svg"
            className="h-8 mr-3"
            alt={appName + " Logo"}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {appName}
          </span>
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
          <button
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
          </button>
        </div>
        {
          <motion.div
            layout
            animate={{
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            initial={{}}
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
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-200/70"
                      } block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 
                      md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        }
      </div>
    </nav>
  )
}
