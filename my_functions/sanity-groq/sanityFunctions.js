import { client } from "./sanity";

function handleLike(post, likes) {
  likes && setLikes(likes + 1);

  // Update the document in the Sanity database
  client
    .patch(post._id)
    .set({ likes: likes + 1 })
    .commit()
    .then(() => {
      console.log(`Successfully updated likes for post ${post}`);
    })
    .catch((error) => {
      console.error(
        `Failed to update likes for post ${post}: ${error.message}`
      );
    });
}
