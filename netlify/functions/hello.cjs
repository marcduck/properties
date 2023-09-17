exports.handler = async (event, context) => {
  const data = { message: "Hello from Netlify Functions!" };
  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};
