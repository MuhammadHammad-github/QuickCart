import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "./components/MyTable";
import MyModal from "../../components/MyModal";
import useGetOrdersByBuyer from "../../hooks/highLevelHooks/orders/useGetOrdersByBuyer";

const BuyerOrders = () => {
  const { buyerOrders } = useGetOrdersByBuyer();
  const [reversedBuyerOrders, setReverseBuyerOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);
  const defaultStateModal = { show: false, products: [] };
  const [open, setOpen] = useState(defaultStateModal);
  useEffect(() => {
    if (!buyerOrders) return;
    setReverseBuyerOrders(buyerOrders.slice().reverse());
  }, [buyerOrders]);
  useEffect(() => {
    let sortOrder = ["pending", "shipped", "delivered", "canceled"];

    const sortedOrders = reversedBuyerOrders.slice().sort((a, b) => {
      return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);
    });
    setSortedOrders(sortedOrders);
  }, [reversedBuyerOrders]);
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9 col-span-12 ">
        <MyModal
          openType2={open}
          setOpen={setOpen}
          defaultState={defaultStateModal}
          className={"p-10 bg-white rounded flex flex-col gap-6"}
        >
          {open.products.map((productObj, index) => {
            return (
              <div key={index}>
                <h4 className="my-4">Product {index + 1}</h4>
                <p>Name: {productObj.product.name}</p>
                <p>Quantity: {productObj.quantity}</p>
                <p className="flex gap-2 items-center">
                  Color:{" "}
                  <div
                    className=" rounded size-5"
                    style={{ backgroundColor: productObj.color }}
                  ></div>
                </p>
              </div>
            );
          })}
        </MyModal>
        <div className="flex flex-col gap-8 my-10">
          <div>
            <h4 className="my-4">Orders</h4>
            <MyTable
              cols={["Status", "Shipping Address", "Total Amount", "Details"]}
            >
              {sortedOrders?.map((order, index) => {
                return (
                  <tr
                    className={`${index % 2 === 0 && "bg-gray-100"} `}
                    key={index}
                  >
                    <td
                      className={`border px-4 py-2 capitalize ${
                        order.status === "pending"
                          ? "text-orange-500"
                          : order.status === "shipped"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="border px-4 py-2 ">{order.buyer.address}</td>
                    <td className="border px-4 py-2 ">${order.totalAmount}</td>
                    <td
                      className="border px-4 py-2 text-blue-500 cursor-pointer"
                      onClick={() =>
                        setOpen({ show: true, products: order.products })
                      }
                    >
                      View Details
                    </td>
                  </tr>
                );
              })}
            </MyTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrders;
