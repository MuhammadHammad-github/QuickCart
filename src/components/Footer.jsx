import React from "react";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import {
  FacebookOutlined,
  GitHub,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const quickLinks = [
    {
      path: "/account",
      text: "My Account",
    },
    {
      path: "/cart",
      text: "My Cart",
    },
    {
      path: "/wishlist",
      text: "Wishlist",
    },
  ];
  const policyLinks = [
    {
      path: "/privacyPolicy",
      text: "Privacy Policy",
    },
    {
      path: "/refundPolicy",
      text: "Refund Policy",
    },
    {
      path: "/termsOfService",
      text: "Terms of Service",
    },
    {
      path: "/shippingPolicy",
      text: "Shipping Policy",
    },
    {
      path: "/contact",
      text: "Contact",
    },
  ];
  return (
    <div className="bg-neutral1-600  ">
      <div className=" respPx20 py-20 ">
        <div className="flex flex-col items-center gap-5">
          <h3>Newsletter</h3>
          <p className="text-center">
            Learn about our most recent news, updates, and deals by subscribing.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex 450px:flex-row flex-col gap-y-5  items-center border  min-w-max my-2"
          >
            <MyInput
              placeholder={"youremail@mail.com"}
              className="700px:!w-[30rem] !w-[20rem] !m-0"
            />
            <MyButton text={"Subscribe"} type="submit" />
          </form>
        </div>
        <div className="grid 1000px:grid-cols-4 450px:grid-cols-2 grid-cols-1 gap-y-10 my-20">
          <div className="450px:col-span-2  flex flex-col gap-5">
            <h6>About Us.</h6>
            <p className="leading-relaxed tracking-wide">
              QuickCart E-Commerce is a dynamic and innovative online
              <br /> retail platform that offers a wide range of products to
              <br />
              customers worldwide.
            </p>
            <div className="flex gap-5">
              <FacebookOutlined className="!text-xl hover:text-primary cursor-pointer transitional" />
              <Twitter className="!text-xl hover:text-primary cursor-pointer transitional" />
              <YouTube className="!text-xl hover:text-primary cursor-pointer transitional" />
              <Instagram className="!text-xl hover:text-primary cursor-pointer transitional" />
              <GitHub className="!text-xl hover:text-primary cursor-pointer transitional" />
            </div>
            <p className="font-[500]">Guaranteed Safe Checkout</p>
            <div>
              <img
                loading="lazy"
                src="/visa.png"
                className="max-w-full object-contain h-5"
                alt=""
              />
            </div>
          </div>
          <HeadingAndLinks heading={"Quick Links"} links={quickLinks} />
          <HeadingAndLinks heading={"Policy Links"} links={policyLinks} />
        </div>
      </div>
      <div className="border-t border-neutral1-400  p-10 flex items-center justify-center">
        <p className="">
          &copy; 2024 <span className="font-medium"> QuickCart </span> All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
const HeadingAndLinks = ({ heading, links }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <h6>{heading}</h6>
      <div className="flex flex-col gap-3">
        {links.map((link, index) => {
          return (
            <a
              href="#"
              onClick={() => navigate(link.path)}
              key={index}
              className="cursor-pointer hover:text-primary transitional text-gray-600 text-sm"
            >
              {link.text}
            </a>
          );
        })}
      </div>
    </div>
  );
};
