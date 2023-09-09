import React, { useEffect, useState } from "react";
import { client } from "./sanity";
import { Property } from "./Property";
import { useParams } from "react-router-dom";
import { shuffle } from "../utils";

export default function PropertyDetail({
  bidderId,
  isLoading,
  postData,
  setPost,
}) {
  let { id } = useParams();

  const currentPost = postData.find((post) => post._id === id);

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
