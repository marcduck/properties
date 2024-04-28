import { cents } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

export default function UserMenu({ bidderId, balance }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-20 my-4 text-base list-none bg-white
                absolute flex flex-col items-center top-6 
              divide-gray-100 rounded-lg shadow-lg
              dark:bg-gray-700 dark:divide-gray-600     
              left-1/2 transform -translate-x-1/2         
              "
      id="user-dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          Bidder ID: <span className="font-semibold">{bidderId}</span>
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
          {bidderId}@Homefinder
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
          Balance: {cents(balance)}
        </span>
      </div>
      {/* <ul
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
      </ul> */}
    </motion.div>
  );
}
