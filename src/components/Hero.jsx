import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Callout from "./Callout";

export default function Hero() {
  return (
    <section className="">
      <div
        className="mt-2 px-4 mx-auto pt-8 md:min-h-[20rem] max-w-screen-xl 
      text-center lg:py-16 z-10 relative flex flex-col items-center justify-center"
      >
        <Callout to="/bank" keyword="New" />
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Find your <span className="">dream home</span>
        </h1>
        <p className="text-sm md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Explore a world of real estate opportunities and bid on your favorite
          properties with our intuitive web-based platform. Bid on properties
          that catch your eye and keep track of your bidding activity in
          real-time.
        </p>
      </div>
      <div className="bg-gradient-to-b -z-10 from-emerald-100 to-transparent dark:from-emerald-900 dark:to-gray-900 w-full h-full absolute top-0 left-0"></div>
    </section>
  );
}
