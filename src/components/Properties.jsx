import React, { useEffect, useState, useId } from "react"
import Pagination from "./Pagination"
import { Property } from "./Property"
import { client } from "./sanity"
import { shuffle } from "../utils"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Banner from "./Banner"

function Properties({ bidderId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [postData, setPost] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)

  // Fetch data from Sanity
  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery"] {
            _id,
            title,
            image,
            likes,
            price,
            highestBidder
            }`
      )
      .then((data) => {
        shuffle(data)
        // console.log(data)
        setIsLoading(false)
        setPost(data)
      })
      .catch(console.error)
  }, [])

  const Skeleton = ({ i }) => {
    return (
      <div
        className="w-full h-min max-w-md 
      bg-white border border-gray-200 
      rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 
      mb-4 break-inside-avoid-column"
      ></div>
    )
  }

  const lastPostIndex = currentPage * pageSize
  const firstPostIndex = lastPostIndex - pageSize
  const currentPosts = postData.slice(
    firstPostIndex,
    lastPostIndex
  )

  return (
    <main className="">
      {/* <Banner /> */}
      <section className="container max-w-screen-xl mx-auto my-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          {postData && (
            <Pagination
              totalPosts={postData.length || 3 * pageSize}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="columns-1 md:columns-2 lg:columns-3">
            <AnimatePresence
              initial={false}
              mode="popLayout"
            >
              {/* {isLoading && (
                <>
                  {[...Array(pageSize)].map((_, i) => (
                    <Skeleton i={i} key={i} />
                  ))}
                </>
              )} */}
              {currentPosts.length &&
                currentPosts.map((post, index) => (
                  <React.Fragment key={post._id}>
                    <Property
                      post={post}
                      index={index}
                      bidderId={bidderId}
                      setPost={setPost}
                    />
                  </React.Fragment>
                ))}
            </AnimatePresence>
          </div>
          {postData && (
            <Pagination
              totalPosts={postData.length || 3 * pageSize}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              position="bottom"
            />
          )}
        </div>
      </section>
      <div className="text-slate-500 text-sm">
        Bidder ID: {bidderId}
      </div>
    </main>
  )
}

function generateBidderId() {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyz".toUpperCase()
  return (
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)]
  )
}

export default Properties
