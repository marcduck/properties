import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Banner from "./components/Banner"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import FeaturedProperty from "./components/FeaturedProperty"
import Properties from "./components/Properties"
import Bank from "./components/Bank"
import PropertyDetail from "./components/PropertyDetail"
import Footer from "./components/Footer"

function App() {
  // App state
  const [bidderId, setBidderId] = useState("")

  // Attempt to load bidderId from local storage
  useEffect(() => {
    const bidderIdFromLocalStorage =
      localStorage.getItem("bidderId")

    if (bidderIdFromLocalStorage) {
      setBidderId(bidderIdFromLocalStorage)
    } else {
      // Generate random three-letter string as bidderId
      const newBidderId = generateBidderId()
      setBidderId(newBidderId)
      localStorage.setItem("bidderId", newBidderId)
    }
  }, [])

  return (
    <div className="">
      <Navbar bidderId={bidderId} />
      <main className="min-h-full">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/properties"
            element={<Properties bidderId={bidderId} />}
          />
          <Route path="/bank" element={<Bank />} />
          <Route
            path="/properties/:id"
            element={<PropertyDetail />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
