import React from "react"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div
      className="gap-2 flex flex-col
          p-6 md:p-12
        bg-slate-300 "
    >
      <Link to="/" className="text-4xl">
        <h1>Property Listings</h1>
      </Link>
      <h2 className="text-xl text-slate-600 ">
        Find your dream home
      </h2>
      <p>
        Welcome to our property listings page! Here, you can
        bid on properties that you like or simply show your
        appreciation by clicking the "Like" button. To place
        a bid, just click on the property price. Each bid
        increases the price by $1000! And don't worry about
        losing track of your bids - we'll display your
        unique bidder ID at the top of the page so you can
        keep track of your bidding activity.
      </p>
    </div>
  )
}

export default Hero
