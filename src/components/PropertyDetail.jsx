import React, { useEffect, useState } from "react"
import { Property } from "./Property"
import { Link, useParams } from "react-router-dom"
import { fetchData, fetchPostById } from "../utils"

export default function PropertyDetail({
  bidderId,
  balance,
  setBalance,
}) {
  let { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetchData("fetchProperty", {
      _id: id,
    })
      .then((propertyPost) => {
        // Handle success
        setPost(propertyPost)
        // console.log("Post fetched successfully:", post);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching post:", error)
      })
  }, [id, balance])

  return (
    <div className="relative page-container flex flex-col items-center">
      <Link to="/" className="">
        <span>Property ID: {id}</span>
        <button className="md:absolute left-0  hover:border-emerald-500/50 border-transparent border-solid border-2 rounded-md flex py-1 px-2 items-center gap-2">
          Back
        </button>
      </Link>
      <div className="flex justify-center md:mt-0 mt-2">
        {post && (
          <Property
            post={post}
            bidderId={bidderId}
            fullView={true}
          />
        )}
      </div>
    </div>
  )
}
