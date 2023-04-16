import { getImageDimensions } from "@sanity/asset-utils"
import { urlFor } from "./components/sanity"
import { useState } from "react"
export const appName = "HomeFinder"

export function urlForImg(source, width) {
  return urlFor(source).fit("max").auto("format").url()
}

// Barebones lazy-loaded image component
export const SampleImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value)
  return (
    <img
      src={urlForImg(value, 800)}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

export const randInt = (min = 0, max = 10) =>
  Math.floor(Math.random() * (max - min)) + min

export function censorId(id = "000") {
  return `${id[0]}••`
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      // console.log({ item })
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.error(err)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function
          ? value(storedValue)
          : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      )
    } catch (err) {
      console.error(err)
    }
  }

  return [storedValue, setValue]
}

export function generateBidderId() {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyz".toUpperCase()
  return (
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)]
  )
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

// Utility functions

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function cents(n) {
  return "$" + numberWithCommas(n.toFixed(2))
}

export function canAfford(coins, price) {
  return price <= coins ? true : false
}

export function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    )
}
