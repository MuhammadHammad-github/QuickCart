import React, { useEffect } from "react";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import { LoginOutlined } from "@mui/icons-material";
import useLoginBuyer from "../../hooks/highLevelHooks/accounts/buyer/useLoginBuyer";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, fetching } = useLoginBuyer();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    login(data);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authTokenBuyer");
    if (!authToken) return;
    navigate("/buyer/dashboard");
  }, []);
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="bg-white shadow-md p-10 750px:w-1/2 450px:w-3/4 400px:w-4/5 w-full  space-y-10">
        <h3>
          <LoginOutlined /> Login
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

export default Login;
