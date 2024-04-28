import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});

export default async (event) => {
  const { bidderId } = JSON.parse(event.body);
  const query = `*[_type == "user" && _id == $userId][0]`;
  const user = await sanity
    .fetch(query, { userId: bidderId })
    .then((data) => {
      return data;
    })
    .catch(console.error);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      // ^ Cors stuff
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
};
