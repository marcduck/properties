import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false,
  apiVersion: `${new Date().toISOString().slice(0, 10)}`,
})

export default async (event, context) => {
  // Now you have the bodyData object, use it as needed!
  // Destructure the query params from the URL
  const params = new URL(event.url).searchParams

  const {
    itemsPerPage,
    lastId,
    order = "desc",
    sortBy = "_id",
  } = Object.fromEntries(params)
  let queryFilter = ""

  if (lastId) {
    queryFilter = `*[_type == "gallery" && ${sortBy} ${
      order === "desc" ? "<" : ">"
    } "${lastId}"] | order(${sortBy} ${order})[0..${itemsPerPage}]`
  } else {
    queryFilter = `*[_type == "gallery"] | order(${sortBy} ${order})[0..${itemsPerPage}]`
  }

  const query =
    queryFilter +
    ` {
                _id,
                _createdAt,
                title,
                image,
                likes,
                price,
                highestBidder
                }`

  const countQuery = `count(*[_type == "gallery"])`

  const properties = await sanity
    .fetch(query)
    .then((data) => {
      const builder = imageUrlBuilder(sanity)

      const output = data.map((property) => {
        return {
          ...property,
          // Formatted image URL
          propertyImage: builder
            .image(property.image)
            .fit("max")
            .auto("format")
            .url(),
        }
      })
      return output
    })
    .catch(console.error)

  const totalPosts = await sanity.fetch(countQuery)

  return new Response(
    JSON.stringify({ properties, totalPosts })
  )
}
