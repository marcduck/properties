import React from "react"
import Skeleton from "react-loading-skeleton"

function PropertySkeleton({ count }) {
  return Array(count)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="h-min  bg-white border border-gray-200 
        w-96
        rounded-lg shadow dark:bg-gray-800 
        dark:border-gray-700 mb-4 break-inside-avoid-column"
      >
        <Skeleton height={40} />
        <Skeleton count={10} />
      </div>
    ))
}

export default PropertySkeleton
