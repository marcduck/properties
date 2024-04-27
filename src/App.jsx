import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import PropertiesPage from "./components/PropertiesPage";
import Bank from "./components/Bank";
import PropertyDetail from "./components/PropertyDetail";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { fetchData, generateBidderId, shuffle, useLocalStorage } from "./utils";
import Footer from "./components/Footer";

function App() {
  // App state
  const [bidderId, setBidderId] = useLocalStorage(
    "bidderId",
    generateBidderId()
  );
  const [balance, setBalance] = useLocalStorage("balance", 10000);

  const [user, setUser] = useState(null);

  // Fetch user
  // useEffect(() => {
  //   const userId = bidderId;
  //   const userData = fetchData("fetchUser", userId);
  //   setUser(userData);
  // }, []);

  const propertyProps = {
    bidderId,
    balance,
    setBalance,
  };

  return (
    <div className="bg-white dark:bg-gray-900 pb-4">
      <div className="pb-4">
        <Navbar balance={balance} bidderId={bidderId} />
      </div>
      <main className={`min-h-full mt-[3.5rem]  `}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <PropertiesPage {...propertyProps} />
              </>
            }
          />
          <Route
            path="/properties"
            element={<PropertiesPage {...propertyProps} />}
          />
          <Route
            path="/bank"
            element={
              <Bank
                balance={balance}
                bidderId={bidderId}
                setBalance={setBalance}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/properties/:id"
            element={<PropertyDetail {...propertyProps} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
