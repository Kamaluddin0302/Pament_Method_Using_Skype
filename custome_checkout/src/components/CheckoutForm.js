import { CardElement } from "@stripe/react-stripe-js";
import * as React from "react";

// markup
const IndexPage = () => {
  return (
    <div>
      <h1>Check out Form</h1>
      <div>
        <CardElement />
      </div>
    </div>
  );
};

export default IndexPage;
