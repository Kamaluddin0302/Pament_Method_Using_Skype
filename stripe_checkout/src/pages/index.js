import * as React from "react";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I6WefJv1iW7R1jkyP9o7c6huPWoVhpYfEwlXgVLMtgWzJuI94lWb9hrGfYCUH1ks26pOoYCDJGBvRIPKOvvPEZ300gXbiGXH0"
);

// markup
const IndexPage = ({ location }) => {
  const redirectToCheckout = async () => {
    console.log("jdnj");
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1I6cmKJv1iW7R1jk9oKFnMmi", quantity: 3 }],
      successUrl: `${location.origin}/Success_payment/`,
      cancelUrl: `${location.origin}/Cancel_payment`,
    });
  };
  return (
    <main>
      <title>Home Page</title>
      <h1>Kamal Uddin</h1>
      <button onClick={() => redirectToCheckout()}>Check Out</button>
    </main>
  );
};

export default IndexPage;

// // Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// exports.handler = async (event) => {
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
//     success_url: "http://localhost:8000/Success_payment/",
//     cancel_url: "http://localhost:8000/Cancel_payment",
//   });
//   try {
//     console.log(session);
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ id: session.id }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     };
//   } catch (error) {
//     return { statusCode: 500, body: "error" };
//   }
// };
