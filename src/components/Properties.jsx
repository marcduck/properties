import React, { useEffect, useState, useId } from "react"
import Pagination from "./Pagination"
import { Property } from "./Property"
import { AnimatePresence, motion } from "framer-motion"
import { fetchData } from "../utils"

function Properties({ bidderId, balance }) {
  const [pageSize, setPageSize] = useState(15)
  const [postData, setPostData] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [lastId, setLastId] = useState(null)

  // Replace: setPostData with response data | Append: add to postData
  function handleFetch(lastId, mode = "replace") {
    fetchData("fetchProperties", {
      itemsPerPage: pageSize,
      lastId: lastId,
    }).then((data) => {
      // If mode is append, add to postData, otherwise replace postData
      if (mode === "append") {
        setPostData([...postData, ...data.properties])
      } else {
        setPostData(data.properties)
      }
      setTotalPosts(data.totalPosts)
      setLastId(
        data.properties[data.properties.length - 1]._id
      )
      setIsLoading(false)
    })
  }

  useEffect(() => {
    handleFetch()
  }, []) // Add currentPage and pageSize to the dependency array

  function handleLoadMore() {
    handleFetch(lastId, "append")
  }

  return (
    <main className="">
      {/* <Banner /> */}
      <section className="container px-4 max-w-screen-xl mx-auto my-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="flex flex-col gap-1 text-sm mr-auto text-gray-400">
            <span className="flex gap-1">
              <div className="font-bold">{totalPosts}</div>{" "}
              results
            </span>
            <div className="text-gray-500">
              Displaying {pageSize} results - page {1} of{" "}
              {Math.ceil(totalPosts / pageSize)}
            </div>
            <div className="text-gray-500">
              lastId: {lastId}
            </div>
          </div>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden grid-rows-[masonry]">
            <AnimatePresence
              // initial={false}
              mode="popLayout"
            >
              {postData.length &&
                postData.map((post, index) => (
                  <React.Fragment key={post._id}>
                    <Property
                      post={post}
                      setPost={setPostData}
                      index={index}
                      bidderId={bidderId}
                    />
                  </React.Fragment>
                ))}
            </AnimatePresence>
          </div>
          <motion.button
            onClick={() => handleLoadMore()}
            className="arrowbutton"
          >
            Load more
          </motion.button>
        </div>
      </section>
    </main>
  )
}

export default Properties
