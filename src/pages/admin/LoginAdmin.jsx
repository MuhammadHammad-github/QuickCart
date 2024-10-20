import React, { useEffect } from "react";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import { LoginOutlined } from "@mui/icons-material";
import useLoginAdmin from "../../hooks/highLevelHooks/accounts/admin/useLoginAdmin";
import useCheckAdmin from "../../hooks/highLevelHooks/accounts/admin/useCheckAdmin";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const { login, fetching } = useLoginAdmin();
  const { adminData } = useCheckAdmin();
  console.log(fetching);
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminData) return;
    if (adminData.success) return;
    else navigate("/signupAdmin");
  }, [adminData]);
  useEffect(() => {
    const authToken = localStorage.getItem("authTokenAdmin");
    if (authToken) navigate("/admin/dashboard");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    await login(data);
  };
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="bg-white shadow-md p-10 750px:w-1/2 450px:w-3/4 400px:w-4/5 w-full  space-y-10">
        <h3>
          <LoginOutlined /> Login As Admin
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <MyInput
            label={"Email"}
            name={"email"}
            type="email"
            placeholder="Enter your email."
          />{" "}
          <MyInput
            label={"Password"}
            name={"password"}
            type="password"
            placeholder="Enter your password."
          />
          <MyButton
            text={"Login"}
            type="submit"
            icon={<LoginOutlined />}
            loading={fetching}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
