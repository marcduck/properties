import React, { useEffect, useState } from "react"
import Pagination from "./Pagination"
import { Property } from "./Property"
import PropertySkeleton from "./PropertySkeleton"
import { client } from "./sanity"
import { shuffle } from "../utils"
import { Link } from "react-router-dom"

function Properties() {
  const [postData, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [bidderId, setBidderId] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)

  // Attempt to load bidderId from local storage
  useEffect(() => {
    const bidderIdFromLocalStorage =
      localStorage.getItem("bidderId")

    if (bidderIdFromLocalStorage) {
      setBidderId(bidderIdFromLocalStorage)
    } else {
      // Generate random three-letter string as bidderId
      const newBidderId = generateBidderId()
      setBidderId(newBidderId)
      localStorage.setItem("bidderId", newBidderId)
    }
  }, [])

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

  const onBidClick = (post) => {
    const newPrice = post.price + 1000

    client
      .patch(post._id)
      .set({ price: newPrice, highestBidder: bidderId })
      .commit()
      .then(() => {
        setPost((prevData) =>
          prevData.map((p) =>
            p._id === post._id
              ? {
                  ...p,
                  price: newPrice,
                  highestBidder: bidderId,
                }
              : p
          )
        )
      })
      .catch(console.error)
  }

  const lastPostIndex = currentPage * pageSize
  const firstPostIndex = lastPostIndex - pageSize
  const currentPosts = postData.slice(
    firstPostIndex,
    lastPostIndex
  )

  return (
    <main className="p-6 md:p-12 mb-auto ">
      <section className="container mx-auto">
        <div className="flex flex-col my-8 gap-8 items-center justify-center">
          {postData && (
            <Pagination
              totalPosts={postData.length || 3 * pageSize}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="columns-1 md:columns-2 lg:columns-3">
            {isLoading && (
              <PropertySkeleton count={pageSize} />
            )}
            {!isLoading &&
              currentPosts.map((post, index) => (
                <>
                  <Property
                    post={post}
                    index={index}
                    onBidClick={onBidClick}
                  />
                </>
              ))}
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
