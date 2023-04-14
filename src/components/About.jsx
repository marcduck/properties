import React from "react"

const about = `

HomeFinder is an online marketplace for virtual real estate,
where you can buy, rent, and sell your property.
All images are generated using StableDiffusion

`

export default function About() {
  return (
    <div className="pt-12 px-4 max-w-screen-xl">
      {about}
    </div>
  )
}
