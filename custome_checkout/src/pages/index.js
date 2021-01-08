import * as React from "react";
import CheckoutForm from "./../components/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51I6WefJv1iW7R1jkyP9o7c6huPWoVhpYfEwlXgVLMtgWzJuI94lWb9hrGfYCUH1ks26pOoYCDJGBvRIPKOvvPEZ300gXbiGXH0"
);

// markup
const IndexPage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default IndexPage;
