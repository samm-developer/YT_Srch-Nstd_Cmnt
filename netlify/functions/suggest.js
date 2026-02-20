/**
 * Netlify serverless function to proxy Google Suggest API.
 * Used in production because the dev proxy (setupProxy.js) only runs locally.
 */
exports.handler = async (event) => {
  const q = event.queryStringParameters?.q || "";
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Suggest API failed" }),
    };
  }
};
