import React from "react";
import Sidebar from "./components/Sidebar";
import { ShoppingCart } from "@mui/icons-material";
import MyTable from "./components/MyTable";
import useGetBuyers from "../../hooks/highLevelHooks/accounts/buyer/useGetBuyers";

const BuyerAccounts = () => {
  const { buyers } = useGetBuyers();
  // const buyers = [
  //   {
  //     email: "mail@mail.com",
  //     address: "dummy address, street # 2, dummy avenue",
  //     phoneNumber: "+923344556677",
  //   },
  // ];
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <h3 className="my-10">
          <ShoppingCart className="!text-3xl" /> Buyer Accounts
        </h3>
        <MyTable cols={["Email", "Address", "Phone"]}>
          {buyers?.map((account, index) => {
            return (
              <tr className={`${index % 2 === 0 && "bg-gray-100"}`} key={index}>
                <td className="border px-4 py-2">{account.email}</td>
                <td className="border px-4 py-2">{account.address}</td>
                <td className="border px-4 py-2">{account.phoneNumber}</td>
              </tr>
            );
          })}
        </MyTable>
      </div>
    </div>
  );
};

export default BuyerAccounts;
