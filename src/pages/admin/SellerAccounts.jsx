import React from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "./components/MyTable";
import { Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetRetailers from "../../hooks/highLevelHooks/accounts/admin/useGetRetailers";

const SellerAccounts = () => {
  const { retailers } = useGetRetailers();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <h3 className="my-10">
          {" "}
          <Store className="!text-3xl" /> Seller Accounts
        </h3>
        <MyTable
          cols={["Name", "Email", "Store Name", "Address", "Phone", "Products"]}
        >
          {retailers?.map((account, index) => {
            return (
              <tr className={`${index % 2 === 0 && "bg-gray-100"}`} key={index}>
                <td className="border px-4 py-2">{account.name}</td>
                <td className="border px-4 py-2">{account.email}</td>
                <td className="border px-4 py-2">{account.storeName}</td>
                <td className="border px-4 py-2">{account.storeAddress}</td>
                <td className="border px-4 py-2">{account.phoneNumber}</td>
                <td className="border px-4 py-2">
                  {" "}
                  <a
                    onClick={() => {
                      navigate(`/admin/products/null/null/${account._id}`);
                    }}
                    className="cursor-pointer text-primary"
                  >
                    {" "}
                    View Products
                  </a>
                </td>
              </tr>
            );
          })}
        </MyTable>
      </div>
    </div>
  );
};

export default SellerAccounts;
