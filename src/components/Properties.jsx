import React, { useEffect, useState, useId } from "react";
import Pagination from "./Pagination";
import { Property } from "./Property";
import { AnimatePresence } from "framer-motion";
import { fetchData } from "../utils";

function Properties({ bidderId, balance }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [postData, setPostData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData("fetchProperties", {
      sortBy: "price",
      order: "asc",
      page: currentPage,
      itemsPerPage: pageSize,
    }).then((data) => {
      setPostData(data.properties);
      setTotalPosts(data.totalPosts);
      setIsLoading(false);
    });
  }, [currentPage, pageSize]); // Add currentPage and pageSize to the dependency array

  const Skeleton = ({ i }) => {
    return (
      <div
        className="w-full h-min max-w-md 
      bg-white border border-gray-200 
      rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 
      mb-4 break-inside-avoid-column"
      ></div>
    );
  };

  return (
    <main className="">
      {/* <Banner /> */}
      <section className="container px-4 max-w-screen-xl mx-auto my-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          {postData && (
            <Pagination
              totalPosts={totalPosts}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="columns-1 md:columns-2 lg:columns-3 overflow-x-hidden">
            <AnimatePresence
              // initial={false}
              mode="popLayout"
            >
              {/* {isLoading && (
                <>
                  {[...Array(pageSize)].map((_, i) => (
                    <Skeleton i={i} key={i} />
                  ))}
                </>
              )} */}
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
          {postData && (
            <Pagination
              totalPosts={totalPosts}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              position="bottom"
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Properties;
