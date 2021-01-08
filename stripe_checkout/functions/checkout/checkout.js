// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe = require("stripe")(
  "sk_test_51I6WefJv1iW7R1jkI4NAtbCnk1ru0yfssNJk8HUesSwTuNvWY2XYv9CN1YGjfuaDQGuc6yEqZIjVKfXrQsHAhBfq00ZHzvQCIc"
);
exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8000/Success_payment/",
    cancel_url: "http://localhost:8000/Cancel_payment",
  });
  try {
    console.log(session);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: "error" };
  }
};

// const express = require("express");
// const app = express();

// // Set your secret key. Remember to switch to your live secret key in production!
// // See your keys here: https://dashboard.stripe.com/account/apikeys
// const Stripe = require("stripe");
// const stripe = Stripe(
//   "sk_test_51I6WefJv1iW7R1jkI4NAtbCnk1ru0yfssNJk8HUesSwTuNvWY2XYv9CN1YGjfuaDQGuc6yEqZIjVKfXrQsHAhBfq00ZHzvQCIc"
// );
// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:8000/success",
//     cancel_url: "http://localhost:8000/cancel",
//   });

//   res.json({ id: session.id });
// });

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));
