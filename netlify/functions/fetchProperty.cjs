import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false,
  apiVersion: `${new Date().toISOString().slice(0, 10)}`,
});

exports.handler = async (event) => {
  try {
    // Parse the incoming POST request body as JSON
    const requestBody = JSON.parse(event.body);

    // Extract the _id from the request body
    const { _id } = requestBody;

    // Construct a query to fetch the specific post based on _id
    const query = `*[_type == "gallery" && _id == $postId] {
      _id,
      title,
      image,
      likes,
      price,
      highestBidder
    }`;

    const properties = await sanity
      .fetch(query, { postId: _id })
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
      });

    if (properties.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Post not found" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(properties),
    };
  } catch (error) {
    console.error("Error fetching post:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
