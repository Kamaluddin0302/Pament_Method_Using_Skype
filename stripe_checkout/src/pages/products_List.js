import * as React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { graphql, useStaticQuery } from "gatsby";

const stripePromise = loadStripe(
  "pk_test_51I6WefJv1iW7R1jkyP9o7c6huPWoVhpYfEwlXgVLMtgWzJuI94lWb9hrGfYCUH1ks26pOoYCDJGBvRIPKOvvPEZ300gXbiGXH0"
);

// markup
const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ProductPrices {
      prices: allStripePrice {
        edges {
          node {
            id
            active
            currency
            unit_amount
            product {
              id
              images
              name
              description
            }
          }
        }
      }
    }
  `);
  let Products = data.prices.edges;

  const redirectToCheckout = async (product_ID) => {
    console.log(product_ID);
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: product_ID, quantity: 3 }],
      successUrl: `${location.origin}/Success_payment/`,
      cancelUrl: `${location.origin}`,
    });
  };
  return (
    <main>
      <h1>Product List</h1>
      {Products &&
        Products.map((v, i) => (
          <div key={v.node.id}>
            {" "}
            <div>Product Name {v.node.product.name}</div>
            <div> Product Description{v.node.product.description}</div>
            <div>
              <img
                src={v.node.product.images[0]}
                style={{ width: "200px", height: "150px" }}
              />
            </div>
            <button onClick={() => redirectToCheckout(v.node.id)}>Buy</button>
          </div>
        ))}
    </main>
  );
};

export default IndexPage;
