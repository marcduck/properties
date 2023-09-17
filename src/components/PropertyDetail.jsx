import React, { useEffect, useState } from "react";
import { Property } from "./Property";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../utils";

export default function PropertyDetail({ bidderId, isLoading, setPost }) {
  let { id } = useParams();

  const currentPost = fetchPostById(id)
    .then((propertyPost) => {
      // Handle success
      // console.log("Post fetched successfully:", post);
      setPost(propertyPost);
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
