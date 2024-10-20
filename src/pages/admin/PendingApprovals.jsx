import React from "react";
import Sidebar from "./components/Sidebar";
import { Pending } from "@mui/icons-material";
import MyTable from "./components/MyTable";
import useGetUnapprovedRetailers from "../../hooks/highLevelHooks/accounts/admin/useGetUnapprovedRetailers";
import useApproveRetailer from "../../hooks/highLevelHooks/accounts/admin/useApproveRetailer";
import useRejectRetailer from "../../hooks/highLevelHooks/accounts/admin/useRejectRetailer";

const PendingApprovals = () => {
  const { retailers, refetch } = useGetUnapprovedRetailers();
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <h3 className="my-10">
          {" "}
          <Pending className="!text-3xl" /> Pending Approvals
        </h3>
        <MyTable
          cols={[
            "Name",
            "Email",
            "Store Name",
            "Store Address",
            "Phone",
            "Approve/Disapprove",
          ]}
        >
          {retailers?.map((account, index) => {
            return (
              <MyRow
                account={account}
                index={index}
                key={index}
                refetch={refetch}
              />
            );
          })}
        </MyTable>
      </div>
    </div>
  );
};

export default PendingApprovals;
const MyRow = ({ index, account, refetch }) => {
  const { approve } = useApproveRetailer(account._id);
  const { reject, rejecting } = useRejectRetailer(account._id);
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-100"}`}>
      <td className="border px-4 py-2">{account.name}</td>
      <td className="border px-4 py-2">{account.email}</td>
      <td className="border px-4 py-2">{account.storeName}</td>
      <td className="border px-4 py-2">{account.storeAddress}</td>
      <td className="border px-4 py-2">{account.phoneNumber}</td>
      <td className="border px-4 py-2">
        {" "}
        <a
          onClick={async () => {
            await approve();
            refetch();
          }}
          className="cursor-pointer text-primary"
        >
          {" "}
          Approve
        </a>{" "}
        /
        <a
          onClick={async (e) => {
            if (rejecting) return;
            console.log("running reject function");
            await reject();
            refetch();
          }}
          className="cursor-pointer text-primary"
        >
          {" "}
          Disapprove
        </a>
      </td>
    </tr>
  );
};
