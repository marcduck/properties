import { useEffect, useState } from "react"

import {
  motion,
  // useAnimation,
  // useInView,
} from "framer-motion"
import { urlForImg, cents } from "../utils"
import { client } from "./sanity"

export function Property({
  post,
  index,
  bidderId,
  setPost,
}) {
  const [likes, setLikes] = useState(post.likes || 0)
  const [bids, setBids] = useState(post.bidCount || 0)
  if (post.price === null) {
    post.price = 0
  }

  // const { ref, inView } = useInView()
  // const animation = useAnimation()
  // useEffect(() => {
  //   if (inView) {
  //     animation.start({
  //       opacity: 1,
  //       transition: {
  //         duration: 2,
  //         type: "spring",
  //         stiffness: 100,
  //       },
  //     })
  //   } else {
  //     animation.start({
  //       opacity: 0,
  //     })
  //   }
  // }, [inView])

  function handleLike(post) {
    setLikes(likes + 1)

    // Update the document in the Sanity database
    client
      .patch(post._id)
      .set({ likes: likes + 1 })
      .commit()
      .then(() => {
        console.log(
          `Successfully updated likes for post ${post}`
        )
      })
      .catch((error) => {
        console.error(
          `Failed to update likes for post ${post}: ${error.message}`
        )
      })
    // TODO: Update the likes count in the database
  }

  const onBidClick = (post) => {
    const newPrice = post.price + 1000
    setBids(bids + 1)

    client
      .patch(post._id)
      .set({
        price: newPrice,
        highestBidder: bidderId,
        bidCount: bids,
      })
      .commit()
      .then(() => {
        setPost((prevData) =>
          prevData.map((p) =>
            p._id === post._id
              ? {
                  ...p,
                  price: newPrice,
                  highestBidder: bidderId,
                  bidCount: bids,
                }
              : p
          )
        )
      })
      .catch(console.error)
  }

  return (
    <motion.div
      // animate={animation}
      // ref={ref}
      key={post._id}
      className="w-full h-min max-w-md 
      bg-white border border-gray-200 
      rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 
      mb-4 break-inside-avoid-column"
    >
      <a href={urlForImg(post.image)} target="_blank">
        <img
          className="w-full rounded-t-lg object-cover "
          src={urlForImg(post.image)}
          alt="product image"
        />
      </a>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {cents(post.price)}
            </span>
            <div className="text-xs text-slate-500 flex gap-1">
              <div>
                {post.bidCount ? post.bidCount : 0} bids
              </div>
              <div className="italic">
                {post.highestBidder
                  ? "| Highest bidder: " +
                    post.highestBidder
                  : null}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleLike(post)}
              className="flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 hover:text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18.417l-1.263-1.144C3.317 12.527.448 9.485.448 5.947.448 2.734 2.72.5 5.6.5c2.168 0 3.87 1.61 4.4 3.418.53-1.808 2.231-3.418 4.4-3.418 2.88 0 5.152 2.234 5.152 5.447 0 3.538-2.87 6.58-8.29 11.326L10 18.417z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-semibold text-slate-800">
                {likes}
              </span>
            </button>
            <button
              title={
                post.highestBidder
                  ? "Highest bidder: " + post.highestBidder
                  : undefined
              }
              onClick={() => onBidClick(post)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Bid
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
