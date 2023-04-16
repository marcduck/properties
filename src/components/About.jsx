import React from "react"

const about = `

HomeFinder is an online marketplace for virtual real estate,
where you can bid on virtual properties.
All images are generated using StableDiffusion

`

export default function About() {
  return (
    <div className="py-12 px-4 max-w-screen-xl">
      {about}
    </div>
  )
}
