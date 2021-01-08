// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe = require("stripe")(
  "sk_test_51I6WefJv1iW7R1jkI4NAtbCnk1ru0yfssNJk8HUesSwTuNvWY2XYv9CN1YGjfuaDQGuc6yEqZIjVKfXrQsHAhBfq00ZHzvQCIc"
);

const handler = async (event) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: paymentIntent.client_secret }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
