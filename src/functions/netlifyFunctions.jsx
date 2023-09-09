export function handleLike(postId, currentLikes) {
  fetch(`${import.meta.env.VITE_SITE_URL}/functions/handleLike`, {
    method: "POST",
    body: JSON.stringify({ postId, likes: currentLikes }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      // Update your UI as needed
    })
    .catch((error) => {
      console.error(error.message);
    });
}
