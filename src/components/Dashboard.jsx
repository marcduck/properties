import React from "react";
import { cents } from "../utils";
import ReactCreditCard from "./ReactCreditCard";

function Dashboard({ balance, bidderId }) {
  return (
    <div className="container page-container">
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        🏗 <span className="italic text-yellow-600 font-bold"> Notice:</span> The
        bank is currently under construction.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Balance card */}
        <div className="bg-emerald-300/30 p-10 rounded-lg">
          <div className="text-sm">Current balance</div>
          <div className="text-2xl">{cents(balance)}</div>
        </div>
        {/* Profile */}
        <div className="p-10">
          <div className="text-sm">Bidder ID</div>
          <div className="text-lg">{bidderId}</div>
          <div className="flex">
            <button className="a">Reset password</button>
            <button className="a"></button>
          </div>
        </div>
        <div className="bg-stone-400 col-span-2 rounded-lg p-10"></div>
        <div className="flex">
          <ReactCreditCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
