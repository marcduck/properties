export default async (event) => {
  client
    .fetch(
      `*[_type == "gallery"] {
                _id,
                title,
                image,
                likes,
                price,
                highestBidder
                }`
    )
    .then((data) => {
      shuffle(data);
      // console.log(data)
      setIsLoading(false);
      setPost(data);
    })
    .catch(console.error);
};
