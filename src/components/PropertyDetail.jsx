import React, { useEffect, useState } from "react";
import { Property } from "./Property";
import { useParams } from "react-router-dom";

export default function PropertyDetail({ bidderId, isLoading, setPost }) {
  let { id } = useParams();

  const currentPost = fetchPostById(id)
    .then((post) => {
      // Handle success
      console.log("Post fetched successfully:", post);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching post:", error);
    });

  return (
    <div className=" pt-1 flex justify-center">
      {!isLoading && (
        <Property
          post={currentPost}
          bidderId={bidderId}
          setPost={setPost}
          fullView={true}
        />
      )}
    </div>
  );
}
