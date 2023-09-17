import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import FeaturedProperty from "./components/FeaturedProperty";
import PropertiesPage from "./components/PropertiesPage";
import Bank from "./components/Bank";
import PropertyDetail from "./components/PropertyDetail";
import Navbar, { Footer } from "./components/Navbar";
import Properties from "./components/Properties";
import About from "./components/About";
import { generateBidderId, shuffle, useLocalStorage } from "./utils";
import { client } from "./components/sanity";

function App() {
  // App state
  const [bidderId, setBidderId] = useLocalStorage(
    "bidderId",
    generateBidderId()
  );
  const [balance, setBalance] = useLocalStorage("balance", 10000);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPost] = useState([]);
  const [filter, setFilter] = useState(null);

  const [user, setUser] = useState(null);

  // Fetch all properties from Sanity

  async function fetchProperties() {
    try {
      const response = await fetch(
        process.env.VITE_FUNCTIONS_URL + "fetchProperties"
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchProperties()
      .then((properties) => {
        console.log(properties);
        setPost(properties);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  // Fetch user
  useEffect(() => {
    const userId = "your-user-id-here";

    client
      .fetch(`*[_type == "user" && _id == $userId][0]`, {
        userId,
      })
      .then((userData) => {
        setUser(userData);
        // console.log(user)
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  const propertiesProps = {
    bidderId,
    postData,
    setPost,
    balance,
    isLoading,
    filter,
  };

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
                <PropertiesPage {...propertiesProps} />
              </>
            }
          />
          <Route
            path="/properties"
            element={<PropertiesPage {...propertiesProps} />}
          />
          <Route
            path="/bank"
            element={<Bank balance={balance} bidderId={bidderId} />}
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
  );
}

export default App;
