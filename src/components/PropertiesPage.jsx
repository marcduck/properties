import React from "react"
import Properties from "./Properties"

export default function PropertiesPage({
  bidderId,
  postData,
  setPost,
  isLoading,
}) {
  return (
    <div className="pt-1">
      <Properties
        bidderId={bidderId}
        postData={postData}
        isLoading={isLoading}
        setPost={setPost}
      />
    </div>
  )
}
