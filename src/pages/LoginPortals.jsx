import { LoginOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPortals = () => {
  const navigate = useNavigate();
  return (
    <div className="my-20 resp3ColGrid gap-8 respPx20">
      <div
        onClick={() => navigate("/loginBuyer")}
        className="bg-accent p-20 text-white flex items-center transitional flex-col gap-3 rounded shadow-md hover:shadow-lg cursor-pointer"
      >
        <LoginOutlined className="!text-5xl text-center" />
        <h4 className="text-center">Buyer Login</h4>
      </div>
      <div
        onClick={() => navigate("/loginSeller")}
        className="bg-neutral1-300 p-20 text-white flex items-center transitional flex-col gap-3 rounded shadow-md hover:shadow-lg cursor-pointer"
      >
        <LoginOutlined className="!text-5xl text-center" />
        <h4 className="text-center">Seller Login</h4>
      </div>
      <div
        onClick={() => navigate("/loginAdmin")}
        className="bg-neutral2 p-20 text-white flex items-center transitional flex-col gap-3 rounded shadow-md hover:shadow-lg cursor-pointer"
      >
        <LoginOutlined className="!text-5xl text-center" />
        <h4 className="text-center">Admin Login</h4>
      </div>
    </div>
  );
};

export default LoginPortals;
