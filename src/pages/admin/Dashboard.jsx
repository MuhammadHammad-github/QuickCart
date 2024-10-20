import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "./components/MyTable";
import useGetTotalBuyers from "../../hooks/highLevelHooks/accounts/buyer/useGetTotalBuyers";
import useGetTotalSellers from "../../hooks/highLevelHooks/accounts/seller/useGetTotalSellers";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const { totalBuyers, fetching: fetchingBuyers } = useGetTotalBuyers();
  const { totalSellers, fetching: fetchingSellers } = useGetTotalSellers();
  const products = [
    {
      images: ["/shoes.png", "/shoes_white.png"],
      name: "Mens Shoes, Good For Jogging",
      originalPrice: "300",
      salePrice: "200",
      description:
        "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
      sales: 4,
      retailer: {
        storeName: "ABC Store",
      },
    },
    {
      images: ["/shoes_white.png"],
      name: "Mens Shoes, Good For Jogging",
      originalPrice: "100",
      salePrice: "75",
      description:
        "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
      sales: 2,
      retailer: {
        storeName: "ABC Store",
      },
    },
    {
      images: ["/purse_khaki.png"],
      name: "Mens Shoes, Good For Jogging",
      originalPrice: "100",
      salePrice: "75",
      description:
        "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
      sales: 3,
      retailer: {
        storeName: "ABC Store",
      },
    },
    {
      images: ["/smart_watch.png"],
      name: "Mens Shoes, Good For Jogging",
      originalPrice: "100",
      salePrice: "75",
      description:
        "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
      sales: 2,
      retailer: {
        storeName: "ABC Store",
      },
    },
  ];

  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full  ">
        <div className="flex flex-wrap gap-8 justify-center border-b-2 pb-8">
          <MyCard
            text1={totalBuyers}
            text2={"Total Buyers"}
            loading={fetchingBuyers}
          />
          <MyCard
            text1={totalSellers}
            text2={"Total Sellers"}
            loading={fetchingSellers}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
const MyCard = ({ text1, text2, loading }) => {
  return (
    <div className="p-10   shadow rounded-md flex items-center justify-center flex-col border-accent border">
      {loading ? <CircularProgress /> : <h6>{text1}</h6>}
      <h4>{text2}</h4>
    </div>
  );
};
