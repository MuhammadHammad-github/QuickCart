import React from "react";
import MyTable from "../admin/components/MyTable";
import Sidebar from "./components/Sidebar";
import useGetSeller from "../../hooks/highLevelHooks/accounts/seller/useGetSeller";
import { Info } from "@mui/icons-material";
import useGetTotalProductsByRetailer from "../../hooks/highLevelHooks/products/useGetTotalProductsByRetailer";
import useGetTotalOrdersByRetailer from "../../hooks/highLevelHooks/orders/useGetTotalOrdersByRetailer";
import useGetTotalCompletedOrdersByRetailer from "../../hooks/highLevelHooks/orders/useGetTotalCompletedOrdersByRetailer";
import useGetTotalPendingOrdersByRetailer from "../../hooks/highLevelHooks/orders/useGetTotalPendingOrdersByRetailer";

const RetailerDashboard = () => {
  const { sellerData } = useGetSeller();
  const { totalProducts } = useGetTotalProductsByRetailer(sellerData?._id);
  const { totalRetailerOrders } = useGetTotalOrdersByRetailer();
  console.log(totalRetailerOrders);
  const { totalCompletedOrders } = useGetTotalCompletedOrdersByRetailer();
  const { totalPendingOrders } = useGetTotalPendingOrdersByRetailer();
  const products = [];
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9 col-span-12 ">
        {sellerData?.allowed === false && (
          <h6 className="mb-5 flex items-center gap-2 bg-primary-800 rounded-lg p-4 text-secondary">
            <Info />
            Your Store Is Not Approved Yet
          </h6>
        )}
        <div className="flex flex-wrap gap-8 justify-center border-b-2 pb-8">
          <MyCard text1={totalProducts || 0} text2={"Total Products"} />
          <MyCard text1={totalRetailerOrders || 0} text2={"Total Orders"} />
          <MyCard text1={totalCompletedOrders} text2={"Completed Orders"} />
          <MyCard text1={totalPendingOrders} text2={"Pending Orders"} />
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;

const MyCard = ({ text1, text2 }) => {
  return (
    <div className="p-10   shadow rounded-md flex items-center justify-center flex-col border-accent border">
      <h6>{text1}</h6>
      <h4>{text2}</h4>
    </div>
  );
};
