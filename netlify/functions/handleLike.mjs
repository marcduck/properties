import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "1emj1fo4",
  dataset: "production",
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});

// Define the Netlify function
export default async (event) => {
  try {
    // Parse the post ID and current likes from the event body
    const { postId, likes } = JSON.parse(event.body);

    // Update the document in the Sanity database
    await sanity
      .patch(postId)
      .set({ likes: likes + 1 })
      .commit();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Like updated successfully" }),
    };
  } catch (error) {
    console.error(`Failed to update like: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update like" }),
    };
  }
};
