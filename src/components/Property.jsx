import React, { useEffect, useState, useRef } from "react";

import {
  motion,
  // useAnimation,
  useInView,
} from "framer-motion";
import { cents, censorId, randInt, placeBid, fetchPostById } from "../utils";
import { Link } from "react-router-dom";
// import { handleLike } from "../functions/netlifyFunctions";

export function Property({
  post,
  setPost,
  bidderId,
  setBalance,
  fullView = false,
}) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [bids, setBids] = useState(post.bidCount || 0);
  const [bidResponse, setBidResponse] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  if (post.price === null) {
    post.price = 0;
  }

  const ref = useRef(null);
  const isInView = useInView(ref);

  const pluralize = (count, noun = "bids", suffix = "s") =>
    `${count ? count : 0} ${noun}${count !== 1 ? suffix : ""}`;

  const onBidClick = (post, bidderId) => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);

    placeBid(post, bidderId)
      .then((data) => {
        console.log("Bid placed successfully:", data);
        setBidResponse("Bid placed!");
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error("Error placing bid:", error);
        setBidResponse("Bid failed! Try again");
        setIsProcessing(false);
      });
  };

  // Property card
  return (
    <motion.div
      ref={ref}
      id={post._id}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0, x: randInt(-50, 50) }}
      transition={{
        duration: 0.6,
        type: "spring",
        damping: randInt(10, 20),
      }}
      exit={{ opacity: 0 }}
      className={`w-full h-min ${fullView ? "max-w-xl" : "max-w-md"} 
      bg-white border border-gray-200 
      rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 
      mb-4 break-inside-avoid-column
      
      `}
    >
      <>
        <Link to={`/properties/${post._id}`}>
          {(
            <img
              className="w-full rounded-t-lg object-cover "
              src={post.propertyImage}
              alt="product image"
            />
          ) || (
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          )}
        </Link>
        <div className="card-bottom p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-stone-900 dark:text-white">
                {cents(post.price)}
              </span>
              <div className="text-xs text-stone-500 flex gap-1">
                <div>
                  {!post.highestBidder ? (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        />
                      </svg>
                      {pluralize(post.bidCount, "bid")}
                    </span> // 0 bids
                  ) : bids ? (
                    `${pluralize(bids, "bid")} | ` // 1 bid
                  ) : null}
                </div>
                <div className="">
                  {post.highestBidder ? (
                    <div>
                      Highest bidder:{" "}
                      <span className="bg-stone-700/60 text-white tracking-widest text-xs py-0 px-1 inline-flex items-center rounded-md">
                        {censorId(post.highestBidder)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center ">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  // onClick={() => handleLike(post, likes)}
                  className=""
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
                </motion.button>
                <span className="text-xs font-semibold text-stone-800">
                  {likes}
                </span>
              </div>
              <SpinnerButton />
            </div>
          </div>
          <div></div>
        </div>
      </>
    </motion.div>
  );

  function SpinnerButton(text = "bid") {
    return (
      <motion.button
        whileHover={!isProcessing && { scale: 1.05 }}
        whileTap={!isProcessing && { scale: 0.95 }}
        onClick={() => onBidClick(post, bidderId)}
        className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-2 
              focus:outline-none focus:ring-emerald-300 font-medium rounded-lg 
              text-sm px-2 py-2.5 min-w-[19ch] text-center dark:bg-emerald-600 
              dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 "
      >
        {isProcessing ? (
          <div className="inline-flex items-center point">
            <svg
              className="inline w-3.5 h-3.5 mr-3 text-white animate-spin"
              aria-hidden="true"
              role="status"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <span>Processing...</span>
          </div>
        ) : !bidResponse ? (
          "Bid"
        ) : (
          bidResponse
        )}
      </motion.button>
    );
  }
}
