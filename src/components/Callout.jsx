import { motion } from "framer-motion"
import React from "react"
import { Link } from "react-router-dom"

export default function Callout({
  to,
  keyword = "New",
  text = "Click to see what's new",
}) {
  return (
    <Link to={to || null}>
      <motion.button
        layout
        transition={"spring"}
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm 
          text-blue-700 bg-blue-200/50 rounded-full dark:bg-blue-900 dark:text-blue-300 
          "
      >
        <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
          {keyword}
        </span>{" "}
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            />
          </svg>
          <span className="text-xs md:text-sm font-medium items-center">
            Personal banking has launched!{" "}
            <br className="md:hidden" /> Check out your
            account
          </span>
          <svg
            aria-hidden="true"
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </motion.button>
    </Link>
  )
}
