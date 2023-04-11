import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Callout from "./Callout"

export default function Hero() {
  return (
    <section className="">
      <div
        className="py-8 px-4 mx-auto min-h-[30rem] max-w-screen-xl 
      text-center lg:py-16 z-10 relative flex flex-col items-center justify-center"
      >
        <Callout
          to="/bank"
          keyword="New"
          text="Personal banking has launched! Check out your account"
        />
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          We invest in the world’s potential
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Here at Flowbite we focus on markets where
          technology, innovation, and capital can unlock
          long-term value and drive economic growth.
        </p>
      </div>
      <div className="bg-gradient-to-b -z-10 from-blue-100 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0"></div>
    </section>
  )
}
