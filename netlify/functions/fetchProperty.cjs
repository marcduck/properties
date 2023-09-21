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
  // Parse the incoming POST request body as JSON
  // const requestBody = JSON.parse(event.body);

  // Extract the _id from the request body
  // const _id = "01ebe080-a3ed-457a-81c4-62847f0eb1f8";
  // console.log(JSON.parse(event.body));
  const { _id } = JSON.parse(event.body);

  // Construct a query to fetch the specific post based on _id
  const query = `*[_type == "gallery" && _id == $postId] {
      _id,
      title,
      image,
      likes,
      price,
      highestBidder
    }`;

  const properties = await sanity.fetch(query, { postId: _id }).then((data) => {
    data = data[0];
    const builder = imageUrlBuilder(sanity);

    return {
      ...data,
      // Formatted image URL
      propertyImage: builder.image(data.image).fit("max").auto("format").url(),
    };
  });

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
};
