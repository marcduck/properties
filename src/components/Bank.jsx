import React from "react";
import { cents } from "../utils";
import Dashboard from "./Dashboard";

function Tabs() {
  const iconClass =
    "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300";
  const tabItems = [
    {
      name: "Profile",
      icon: (
        <svg
          aria-hidden="true"
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  ];
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabItems?.map((item) => (
          <li key={item.name} className="mr-2">
            <button className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              {item.icon && item.icon}
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Bank({ balance, bidderId }) {
  return (
    <div className="">
      {/* <Tabs /> */}
      <Dashboard balance={balance} bidderId={bidderId} />
    </div>
  );
}
