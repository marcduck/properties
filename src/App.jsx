import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Banner from "./components/Banner"
import Hero from "./components/Hero"
import FeaturedProperty from "./components/FeaturedProperty"
import PropertiesPage from "./components/PropertiesPage"
import Bank from "./components/Bank"
import PropertyDetail from "./components/PropertyDetail"
import Navbar, { Footer } from "./components/Navbar"
import Properties from "./components/Properties"
import About from "./components/About"

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
      <main className={`min-h-full mt-[3.5rem]`}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Properties bidderId={bidderId} />
              </>
            }
          />
          <Route
            path="/properties"
            element={<PropertiesPage bidderId={bidderId} />}
          />
          <Route path="/bank" element={<Bank />} />
          <Route path="/about" element={<About />} />
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
