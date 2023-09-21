import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
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
      const builder = imageUrlBuilder(sanity);

      const output = data.map((property) => {
        return {
          ...property,
          // Formatted image URL
          propertyImage: builder
            .image(property.image)
            .fit("max")
            .auto("format")
            .url(),
        };
      });
      return output;
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
    body: JSON.stringify(properties),
  };
};
