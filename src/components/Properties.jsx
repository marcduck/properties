import React, { useEffect, useState, useId } from "react";
import Pagination from "./Pagination";
import { Property } from "./Property";
import { AnimatePresence } from "framer-motion";
import { fetchData } from "../utils";

function Properties({ bidderId, balance }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData("fetchProperties").then((data) => {
      setPostData(data);
      setIsLoading(false);
    });
  }, []);

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

  const lastPostIndex = currentPage * pageSize;
  const firstPostIndex = lastPostIndex - pageSize;
  const currentPosts = postData.slice(firstPostIndex, lastPostIndex);

  return (
    <main className="">
      {/* <Banner /> */}
      <section className="container px-4 max-w-screen-xl mx-auto my-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          {postData && (
            <Pagination
              totalPosts={postData.length || 3 * pageSize}
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
              {currentPosts.length &&
                currentPosts.map((post, index) => (
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
              totalPosts={postData.length || 3 * pageSize}
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
