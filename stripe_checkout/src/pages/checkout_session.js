import * as React from "react";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I6WefJv1iW7R1jkyP9o7c6huPWoVhpYfEwlXgVLMtgWzJuI94lWb9hrGfYCUH1ks26pOoYCDJGBvRIPKOvvPEZ300gXbiGXH0"
);

// markup
const IndexPage = ({ location }) => {
  const redirectToCheckout = async () => {
    console.log("run");
    const stripe = await stripePromise;
    const response = await fetch("/.netlify/functions/checkout");
    const data = await response.json();
    console.log(await data.id);
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };
  return (
    <main>
      <h1>Session Check out</h1>
      <button onClick={() => redirectToCheckout()}>Check Out</button>
    </main>
  );
};

export default IndexPage;
