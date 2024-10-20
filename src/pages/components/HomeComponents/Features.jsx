import {
  CreditCard,
  CreditCardOutlined,
  LocalShipping,
  LocalShippingOutlined,
  Money,
  Support,
  SupportAgent,
  SupportAgentOutlined,
  SupportOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import React from "react";

const Features = () => {
  return (
    <section className="my-20 ">
      <div className="p-10 border  rounded-lg grid  1200px:grid-cols-4 650px:grid-cols-2 grid-cols-1 gap-5 gap-y-10 ">
        <Feature
          heading={"Free Shipping"}
          text={"On orders over $99."}
          icon={<LocalShippingOutlined className="!text-6xl  " />}
        />
        <Feature
          heading={"Money Back"}
          text={"Money back in 15 days."}
          icon={<WalletOutlined className="!text-6xl  " />}
        />
        <Feature
          heading={"Secure Checkout"}
          text={"100% Payment Secure."}
          icon={<CreditCardOutlined className="!text-6xl  " />}
        />
        <Feature
          heading={"Online Support"}
          text={"Ensure the product quality."}
          icon={<SupportAgentOutlined className="!text-6xl  " />}
        />
      </div>
    </section>
  );
};

export default Features;
const Feature = ({ icon, heading, text }) => {
  return (
    <div className="flex items-center gap-4 min-w-max ">
      {icon}
      <div className="flex flex-col gap-1">
        <h6 className="font-medium">{heading}</h6>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
