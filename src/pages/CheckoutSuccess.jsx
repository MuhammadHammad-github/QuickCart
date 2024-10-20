import React, { useEffect, useState } from "react";
import backendUrl from "../utils/backendUrl";
import { useParams } from "react-router-dom";
import { Check } from "@mui/icons-material";
import useCreateOrder from "../hooks/highLevelHooks/orders/useCreateOrder";

const CheckoutSuccess = ({}) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { createOrder } = useCreateOrder();
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) return;
    const fetchOrder = async () => {
      const response = await fetch(
        `${backendUrl}/api/order/getCheckoutSession/${sessionId}`,
        {
          headers: {
            authtoken: localStorage.getItem("authTokenBuyer"),
          },
        }
      );
      const data = await response.json();
      console.log(data.session);
      setOrderDetails(data.session);
    };

    fetchOrder();
  }, []);
  useEffect(() => {
    if (!orderDetails || alreadyCreated) return;
    const { productIds, colors } = orderDetails.metadata;
    const productIdsArray = productIds.split(",");
    const colorsArray = colors.split(",");
    console.log(productIdsArray);
    const customProductArray = [];
    orderDetails.line_items.data.forEach((value, index) => {
      customProductArray[index] = {
        product: productIdsArray[index],
        quantity: value.quantity,
        color: colorsArray[index],
      };
    });

    const objectToSend = {
      products: customProductArray,
      totalAmount: orderDetails.amount_total / 100,
    };
    createOrder(objectToSend);
    setAlreadyCreated(true);
    localStorage.removeItem("cart");
    sessionStorage.removeItem("sessionId");
  }, [orderDetails]);
  console.log(orderDetails);
  if (!orderDetails) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center gap-8 my-20">
      <div className="rounded-full size-12 bg-green-400 flex items-center justify-center text-white">
        <Check />
      </div>
      <h1 className="text-center">Thank you for your purchase!</h1>
      <p>Order ID: {orderDetails.id}</p>
      <p>Amount: ${(orderDetails.amount_total / 100).toFixed(2)}</p>
      {/* Display more details as necessary */}
    </div>
  );
};

export default CheckoutSuccess;
