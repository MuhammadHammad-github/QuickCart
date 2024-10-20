import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import backendUrl from "../../../utils/backendUrl";
import MyButton from "../../../components/MyButton";

// Replace with your publishable key
const stripePromise = loadStripe(
  "pk_test_51NwQW5GeNInzyjCWEbMrS0elK0q7WDnEHWUYb4Kt1u5D6llnVDeY1s6TWNLjKJYvQ09ojc3swIQKYGirzxXAQ9VE00TXHfp6rG"
);

const CheckoutButton = ({}) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const cart = localStorage.getItem("cart");
      if (!cart) return;
      const cartItems = JSON.parse(cart);

      const response = await fetch(
        `${backendUrl}/api/order/createCheckoutSession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("authTokenBuyer"),
          },
          body: JSON.stringify({
            items: cartItems,
            success_url: `${window.location.origin}/checkoutSuccess`,
            cancel_url: `${window.location.origin}/checkout`,
          }),
        }
      );

      const session = await response.json();

      sessionStorage.setItem("sessionId", session.id);
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.log(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyButton
      onClick={handleCheckout}
      text={"Proceed To Checkout"}
      disabled={loading}
    />
  );
};

export default CheckoutButton;
