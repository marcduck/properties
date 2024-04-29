import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});
export default async (req, context) => {
  const {
    page = 1,
    itemsPerPage = 10,
    sortBy = "createdAt",
    order = "desc",
  } = context.params;

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  const query = `*[_type == "gallery"] | order(${sortBy} ${order}) [${start}...${end}] {
                _id,
                title,
                image,
                likes,
                price,
                highestBidder
                }`;

  const countQuery = `count(*[_type == "gallery"])`;

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

  const totalPosts = await sanity.fetch(countQuery);

  return new Response(JSON.stringify({ properties, totalPosts }));
};
