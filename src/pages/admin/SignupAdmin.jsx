import React, { useEffect } from "react";
import useCheckAdmin from "../../hooks/highLevelHooks/accounts/admin/useCheckAdmin";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import useCreateAccountAdmin from "../../hooks/highLevelHooks/accounts/admin/useCreateAccountAdmin";

const SignupAdmin = () => {
  const { adminData } = useCheckAdmin();
  const { createAccount, fetching } = useCreateAccountAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (adminData?.success) navigate("/loginAdmin");
  }, [adminData]);
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

export default SignupAdmin;
