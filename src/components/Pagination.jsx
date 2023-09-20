import React, { memo } from "react";

function Pagination({
  totalPosts,
  pageSize,
  currentPage,
  setCurrentPage,
  position = "",
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / pageSize); i++) {
    pages.push(i);
  }
  return (
    <ul
      onClick={(e) => {
        position === "bottom"
          ? window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          : null;
      }}
      className="inline-flex items-center -space-x-px"
    >
      <button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
        disabled={1 == currentPage}
        className="arrowbutton rounded-l-lg"
      >
        <span className="sr-only">Previous</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 leading-tight text-stone-500  border border-stone-300  hover:text-stone-700  dark:border-stone-700 dark:text-stone-400  dark:hover:text-white ${
              page == currentPage
                ? "bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-600"
                : "bg-white hover:bg-stone-100 dark:hover:bg-stone-700"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => {
          if (currentPage < Math.ceil(totalPosts / pageSize)) {
            setCurrentPage(currentPage + 1);
          }
        }}
        className="arrowbutton rounded-r-lg"
        disabled={currentPage == pages[pages.length - 1]}
      >
        <span className="sr-only">Next</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </ul>
  );
}

export default Pagination;
