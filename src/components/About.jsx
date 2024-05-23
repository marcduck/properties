import React from "react"
import Hero from "./Hero"

const about = `

Homefinder is an online marketplace for virtual real estate,
where you can bid on virtual properties.
All images are generated using StableDiffusion.

`

export default function About() {
  return (
    <div>
      {/* <Hero /> */}
      <div className="page-container ">{about}</div>
    </div>
  )
}
