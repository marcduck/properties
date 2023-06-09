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
import {
  generateBidderId,
  shuffle,
  useLocalStorage,
} from "./utils"
import { client } from "./components/sanity"

function App() {
  // App state
  const [bidderId, setBidderId] = useLocalStorage(
    "bidderId",
    generateBidderId()
  )
  const [balance, setBalance] = useLocalStorage(
    "balance",
    10000
  )
  const [isLoading, setIsLoading] = useState(true)
  const [postData, setPost] = useState([])

  const [user, setUser] = useState(null)

  // Fetch all properties from Sanity
  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery"] {
            _id,
            title,
            image,
            likes,
            price,
            highestBidder
            }`
      )
      .then((data) => {
        shuffle(data)
        // console.log(data)
        setIsLoading(false)
        setPost(data)
      })
      .catch(console.error)
  }, [])

  // Fetch user
  useEffect(() => {
    const userId = "your-user-id-here"

    client
      .fetch(`*[_type == "user" && _id == $userId][0]`, {
        userId,
      })
      .then((userData) => {
        setUser(userData)
        // console.log(user)
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
      })
  }, [])

  return (
    <div className="">
      <div className="pb-4">
        <Navbar balance={balance} bidderId={bidderId} />
      </div>
      <main className={`min-h-full mt-[3.5rem]`}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <PropertiesPage
                  bidderId={bidderId}
                  postData={postData}
                  setPost={setPost}
                  balance={balance}
                  isLoading={isLoading}
                />
              </>
            }
          />
          <Route
            path="/properties"
            element={
              <PropertiesPage
                bidderId={bidderId}
                postData={postData}
                setPost={setPost}
                balance={balance}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/bank"
            element={
              <Bank balance={balance} bidderId={bidderId} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/properties/:id"
            element={
              <PropertyDetail
                bidderId={bidderId}
                postData={postData}
                setPost={setPost}
                balance={balance}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
