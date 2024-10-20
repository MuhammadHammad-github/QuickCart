import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import { Clear, Edit, LoginOutlined } from "@mui/icons-material";
import useGetBuyer from "../../hooks/highLevelHooks/accounts/buyer/useGetBuyer";
import useUpdateBuyer from "../../hooks/highLevelHooks/accounts/buyer/useUpdateBuyer";

const AccountDetails = () => {
  const { buyerData, refetch } = useGetBuyer();
  const { updateAccount, fetching } = useUpdateBuyer();
  const defaultCustomFormData = {
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  };
  const [customFormData, setCustomFormData] = useState(defaultCustomFormData);
  const [readOnly, setReadOnly] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    if (password === "" || !password) formData.delete("password");
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    await updateAccount(data);
    e.target.reset();
    refetch();
    setReadOnly(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (!buyerData) return;
    setCustomFormData({ ...buyerData });
  }, [buyerData]);
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full  ">
        <div className="flex items-center justify-between">
          <h3>Account Details</h3>
          {readOnly ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setReadOnly(false);
              }}
            >
              <Edit />
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                setReadOnly(true);
              }}
            >
              <Clear />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 my-10">
          <MyInput
            label={"Name"}
            name={"name"}
            placeholder="e.g: John Doe"
            readOnly={readOnly}
            value={customFormData.name}
            onChange={handleChange}
          />{" "}
          <MyInput
            label={"Email"}
            name={"email"}
            type="email"
            placeholder="e.g: mail@mail.com"
            readOnly={readOnly}
            value={customFormData.email}
            onChange={handleChange}
          />{" "}
          <MyInput
            label={"Password"}
            name={"password"}
            type="password"
            required={false}
            placeholder="Enter new password."
            readOnly={readOnly}
            value={customFormData.password}
            onChange={handleChange}
          />
          <MyInput
            label={"Address"}
            name={"address"}
            type="text"
            placeholder="Enter your address."
            readOnly={readOnly}
            value={customFormData.address}
            onChange={handleChange}
          />
          <MyInput
            label={"Phone Number"}
            name={"phoneNumber"}
            type="tel"
            placeholder="Enter your phone number."
            readOnly={readOnly}
            value={customFormData.phoneNumber}
            onChange={handleChange}
          />
          <MyButton
            text={"Edit"}
            type="submit"
            icon={<LoginOutlined />}
            disabled={readOnly}
            loading={fetching}
          />
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
