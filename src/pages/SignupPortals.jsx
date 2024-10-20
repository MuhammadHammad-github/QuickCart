import { LoginOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPortals = () => {
  const navigate = useNavigate();
  return (
    <div className="my-20 grid 850px:grid-cols-2 grid-cols-1 gap-8 respPx20">
      <div
        onClick={() => navigate("/signupBuyer")}
        className="bg-accent p-20 text-white flex items-center transitional flex-col gap-3 rounded shadow-md hover:shadow-lg cursor-pointer"
      >
        <LoginOutlined className="!text-5xl text-center" />
        <h4 className="text-center">Buyer Signup</h4>
      </div>
      <div
        onClick={() => navigate("/signupSeller")}
        className="bg-neutral1-300 p-20 text-white flex items-center transitional flex-col gap-3 rounded shadow-md hover:shadow-lg cursor-pointer"
      >
        <LoginOutlined className="!text-5xl text-center" />
        <h4 className="text-center">Seller Signup</h4>
      </div>
    </div>
  );
};

export default SignupPortals;
