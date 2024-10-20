import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "../admin/components/MyTable";
import useGetOrdersByRetailer from "../../hooks/highLevelHooks/orders/useGetOrdersByRetailer";
import MyModal from "../../components/MyModal";
import MyButton from "../../components/MyButton";
import useUpdateOrder from "../../hooks/highLevelHooks/orders/useUpdateOrder";
import { CircularProgress } from "@mui/material";

const RetailerOrders = () => {
  const { retailerOrders, getOrders, fetching } = useGetOrdersByRetailer();
  const defaultStateModal = { show: false, products: [] };
  const defaultStateStatusModal = { show: false, id: null, status: null };
  const [open, setOpen] = useState(defaultStateModal);
  const [openStatusModal, setOpenStatusModal] = useState(
    defaultStateStatusModal
  );
  const { updateOrder } = useUpdateOrder(openStatusModal.id);
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
        <MyModal
          openType2={openStatusModal}
          setOpen={setOpenStatusModal}
          defaultState={defaultStateStatusModal}
          className={"p-10 bg-white rounded flex flex-col gap-6"}
        >
          <MyButton
            text={"Mark as Pending"}
            disabled={openStatusModal.status === "pending"}
            onClick={async () => {
              await updateOrder({ status: "pending" });
              setOpenStatusModal(defaultStateStatusModal);
              getOrders();
            }}
          />
          <MyButton
            text={"Mark as Shipped"}
            disabled={openStatusModal.status === "shipped"}
            onClick={async () => {
              await updateOrder({ status: "shipped" });
              setOpenStatusModal(defaultStateStatusModal);
              getOrders();
            }}
          />
          <MyButton
            text={"Mark as Delivered"}
            disabled={openStatusModal.status === "delivered"}
            onClick={async () => {
              await updateOrder({ status: "delivered" });
              setOpenStatusModal(defaultStateStatusModal);
              getOrders();
            }}
          />
        </MyModal>
        <div className="flex flex-col gap-8 my-10">
          <div>
            <h4 className="my-4">Orders</h4>
            {fetching && <CircularProgress />}
            <MyTable
              cols={[
                "Status",
                "Buyer Name",
                "Shipping Address",
                "Total Amount",
                "Details",
              ]}
            >
              {retailerOrders?.map((order, index) => {
                return (
                  <tr
                    className={`${index % 2 === 0 && "bg-gray-100"} `}
                    key={index}
                  >
                    <td
                      onClick={() => {
                        setOpenStatusModal({
                          show: true,
                          id: order._id,
                          status: order.status,
                        });
                      }}
                      className={`border px-4 py-2 capitalize cursor-pointer  ${
                        order.status === "pending"
                          ? "text-orange-500"
                          : order.status === "shipped"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="border px-4 py-2 ">{order.buyer.name}</td>
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

export default RetailerOrders;
