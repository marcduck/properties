import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false,
  apiVersion: `${new Date().toISOString().slice(0, 10)}`,
})

export default async (event) => {
  // Parse the incoming POST request body as JSON
  // const requestBody = JSON.parse(event.body);

  // Extract the _id from the request body
  const params = new URL(event.url).searchParams

  const { _id } = Object.fromEntries(params)

  // Construct a query to fetch the specific post based on _id
  const query = `*[_type == "gallery" && _id == $postId] {
      _id,
      _createdAt,
      title,
      image,
      likes,
      price,
      highestBidder
    }`

  const properties = await sanity
    .fetch(query, { postId: _id })
    .then((data) => {
      data = data[0]
      const builder = imageUrlBuilder(sanity)

      return {
        ...data,
        // Formatted image URL
        propertyImage: builder
          .image(data.image)
          .fit("max")
          .auto("format")
          .url(),
      }
    })

  return new Response(JSON.stringify(properties))
}
