export function handleLike(postId, currentLikes) {
  fetch(`https://homefinderproperties.netlify.app/functions/handleLike`, {
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
