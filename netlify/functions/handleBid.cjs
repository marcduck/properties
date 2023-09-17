import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});

exports.handler = async (event) => {
  // Parse the incoming POST request body as JSON
  const requestBody = JSON.parse(event.body);

  // Extract the values you need from the request body
  const { _id, price, bidderId, bids } = requestBody;
  const bidAmount = 1000;

  // Perform the Sanity patch operation
  const response = await sanity
    .patch(_id)
    .set({
      price: price + bidAmount,
      highestBidder: bidderId,
      bidCount: bids + 1,
    })
    .commit();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response), // Send the Sanity response as the body
  };
};
