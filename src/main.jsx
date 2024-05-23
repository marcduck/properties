import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import { BrowserRouter, HashRouter } from "react-router-dom"
import "flowbite"
import { Flowbite } from "flowbite-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Flowbite>
        <App />
      </Flowbite>
    </HashRouter>
  </React.StrictMode>
)
