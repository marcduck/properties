import React from "react"

export default function FeaturedProperty() {
  const cards = ["a", "b", "c"]
  return (
    <div className="flex ">
      {cards.map((card) => (
        <div key={card}>
          <h1>{card}</h1>
        </div>
      ))}
    </div>
  )
}
