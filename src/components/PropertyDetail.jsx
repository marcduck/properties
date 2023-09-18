import React, { useEffect, useState } from "react";
import { Property } from "./Property";
import { useParams } from "react-router-dom";
import { fetchData, fetchPostById } from "../utils";

export default function PropertyDetail({ bidderId, balance }) {
  let { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchData("fetchProperty", {
      _id: id,
    })
      .then((propertyPost) => {
        // Handle success
        setPost(propertyPost);
        console.log("Post fetched successfully:", post);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching post:", error);
      });
  }, [id]);

  return (
    <div className=" pt-1 flex justify-center">
      {post && <Property post={post} bidderId={bidderId} fullView={true} />}
    </div>
  );
}
