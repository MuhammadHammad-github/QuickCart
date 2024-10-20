import React from "react";
import Sidebar from "./components/Sidebar";
import useGetTotalOrdersByBuyer from "../../hooks/highLevelHooks/orders/useGetTotalOrdersByBuyer";
import useGetTotalPendingOrdersByBuyer from "../../hooks/highLevelHooks/orders/useGetTotalPendingOrdersByBuyer";

const BuyerDashboard = () => {
  const { totalOrders } = useGetTotalOrdersByBuyer();
  const { totalPendingOrders } = useGetTotalPendingOrdersByBuyer();
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full  ">
        <div className="flex flex-wrap gap-8 justify-center border-b-2 pb-8">
          <MyCard text1={totalOrders} text2={"Products Ordered"} />
          <MyCard text1={totalPendingOrders} text2={"Pending Orders"} />
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
const MyCard = ({ text1, text2 }) => {
  return (
    <div className="p-10   shadow rounded-md flex items-center justify-center flex-col border-accent border">
      <h6>{text1}</h6>
      <h4>{text2}</h4>
    </div>
  );
};
