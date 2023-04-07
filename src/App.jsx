import React from "react"
import Properties from "./components/Properties"
import { BrowserRouter, Route } from "react-router-dom"
import Hero from "./components/Hero"

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Hero />
        </header>
        <main>
          <Properties />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
