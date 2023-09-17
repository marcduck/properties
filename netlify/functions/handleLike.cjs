import { client } from "../../src/components/sanity";

// Define the Netlify function
export default async (event) => {
  try {
    // Parse the post ID and current likes from the event body
    const { postId, likes } = JSON.parse(event.body);

    // Update the document in the Sanity database
    await client
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
