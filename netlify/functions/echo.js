export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body)

    // Do something with the body data here (e.g., validate, process)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data received successfully!",
        originalData: body,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
