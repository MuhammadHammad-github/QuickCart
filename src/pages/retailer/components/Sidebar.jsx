import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Logout,
  Pending,
  ShoppingBag,
  ShoppingCart,
  Store,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();
  return (
    <section
      className={`p-5 ${
        toggled && "!left-0"
      } 900px:col-span-3 900px:static absolute top-0 650px:-left-1/3 400px:-left-1/2  -left-3/4 transitional bg-white 900px:h-auto h-screen 900px:w-full  650px:w-1/3 400px:w-1/2 w-3/4   flex flex-col border z-30`}
    >
      <div
        className="900px:hidden z-40 bg-white bg-opacity-80  relative top-1/2 left-[108%] w-max p-2"
        onClick={() => setToggled((prev) => !prev)}
      >
        {toggled ? <ChevronLeft /> : <ChevronRight />}
      </div>
      <MyLink
        text={"Dashboard"}
        path={"/retailer/dashboard"}
        icon={<Dashboard />}
      />
      <MyLink
        text={"Products"}
        path={"/retailer/store"}
        icon={<ShoppingCart />}
      />
      <MyLink
        text={"Orders"}
        path={"/retailer/orders"}
        icon={<ShoppingCart />}
      />
      <a
        onClick={() => {
          localStorage.removeItem("authTokenSeller");
          navigate("/loginSeller");
        }}
        className={`hover:text-primary rounded transitional cursor-pointer p-5 `}
      >
        <Logout /> Logout
      </a>
    </section>
  );
};
const MyLink = ({ path, text, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <a
      onClick={() => {
        if (pathname === path) return;
        navigate(path);
      }}
      className={`hover:text-accent rounded transitional cursor-pointer p-5 ${
        pathname === path &&
        "bg-accent text-white hover:!text-white hover:shadow-md "
      }`}
    >
      {icon} {text}
    </a>
  );
};
export default Sidebar;
