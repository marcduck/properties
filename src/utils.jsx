import { getImageDimensions } from "@sanity/asset-utils";
import { useState } from "react";
export const appName = "Homefinder";

export const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/properties",
  },
  {
    name: "Bank",
    path: "/bank",
  },
  {
    name: "About",
    path: "/about",
  },
];

export const randInt = (min = 0, max = 10) =>
  Math.floor(Math.random() * (max - min)) + min;

export function censorId(id = "000") {
  return `${id[0]}••`;
}

export async function fetchData(action, body = {}) {
  let requestInfo;
  if (Object.keys(body).length > 0) {
    requestInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  const url = import.meta.env.VITE_FUNCTIONS_URL + action;
  // console.log({ url, requestInfo });
  const response = await fetch(url, requestInfo);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function placeBid(
  post,
  bidderId = "000",
  balance,
  action = "handleBid"
) {
  try {
    const response = await fetch(import.meta.env.VITE_FUNCTIONS_URL + action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...post,
        bidderId: bidderId,
        balance: balance,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Bid placed successfully:", data);
    return data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}

export async function fetchPostById(postId) {
  const requestBody = {
    _id: postId, // Pass the ID of the post you want to fetch
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_FUNCTIONS_URL + "fetchProperty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Post fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // console.log({ item })
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
};

export function generateBidderId() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  return (
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)]
  );
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Utility functions

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function cents(n) {
  if (!parseInt(n)) {
    n = 0;
  }
  return "$" + numberWithCommas(n.toFixed(2));
}

export function canAfford(coins, price) {
  return price <= coins ? true : false;
}

export function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}
