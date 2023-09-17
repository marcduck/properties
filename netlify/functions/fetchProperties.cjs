import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = "1emj1fo4";
const dataset = "production";

const sanity = createClient({
  projectId: projectId,
  dataset: dataset,
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});

exports.handler = async () => {
  const query = `*[_type == "gallery"] {
                _id,
                title,
                image,
                likes,
                price,
                highestBidder
                }`;
  const properties = await sanity
    .fetch(query)
    .then((data) => {
      return data;
    })
    .catch(console.error);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(properties),
  };
};
