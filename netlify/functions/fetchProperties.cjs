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

function urlForImg(builder, source, width) {
  return builder.image(source).fit("max").auto("format").url();
}

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(properties),
  };
};
