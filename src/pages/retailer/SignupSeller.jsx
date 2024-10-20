import { LoginOutlined } from "@mui/icons-material";
import React from "react";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import useCreateAccountSeller from "../../hooks/highLevelHooks/accounts/seller/useCreateAccountSeller";

const SignupSeller = () => {
  const { createAccount, fetching } = useCreateAccountSeller();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    await createAccount(data);
  };
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="bg-white shadow-md p-10 750px:w-1/2 450px:w-3/4 400px:w-4/5 w-full space-y-10">
        <h3>
          <LoginOutlined /> Sign Up
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <MyInput label={"Name"} name={"name"} placeholder="e.g: John Doe" />{" "}
          <MyInput
            label={"Store Name"}
            name={"storeName"}
            placeholder="e.g: XYZ"
          />{" "}
          <MyInput
            label={"Email"}
            name={"email"}
            type="email"
            placeholder="e.g: mail@mail.com"
          />{" "}
          <MyInput
            label={"Password"}
            name={"password"}
            type="password"
            placeholder="Enter your password."
          />
          <MyInput
            label={"Store Address"}
            name={"storeAddress"}
            type="text"
            placeholder="Enter your address."
          />
          <MyInput
            label={"Phone Number"}
            name={"phoneNumber"}
            type="tel"
            placeholder="Enter your phone number."
          />
          <MyButton
            text={"Register"}
            type="submit"
            icon={<LoginOutlined />}
            loading={fetching}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupSeller;
