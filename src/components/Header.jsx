import {
  Category,
  ChevronLeft,
  Clear,
  Close,
  PersonOutlined,
  PhoneOutlined,
  RemoveShoppingCart,
  Search,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import MyInput from "./MyInput";
import { useNavigate } from "react-router-dom";
import useGetCategories from "../hooks/highLevelHooks/categories/useGetCategories";
import useGetProduct from "../hooks/highLevelHooks/products/useGetProduct";
import MyButton from "./MyButton";

const Header = () => {
  const navigate = useNavigate();
  const { categories } = useGetCategories();
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef("");
  const search = () => {
    navigate(`/shop/null/null/${searchVal || "null"}`);
  };
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setAccountOpen(false);
    setCartOpen(false);
  };
  const toggleAccount = () => {
    setAccountOpen((prev) => !prev);
    setSearchOpen(false);
    setCartOpen(false);
  };
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
    setAccountOpen(false);
    setSearchOpen(false);
  };
  return (
    <header className=" p-10 z-50">
      <div className="flex items-center 550px:flex-row flex-col  gap-x-5  gap-y-10 justify-between">
        <div className="min-w-max flex gap-4 items-center">
          <PhoneOutlined className="!text-3xl  text-secondary font-extralight" />
          <div>
            <p className="text-sm text-secondary">Get Support</p>
            <p className="font-medium">123-456-789-10</p>
          </div>
        </div>
        <div className="min-w-max">
          <a href="#" className="font-extrabold  text-2xl">
            Quick<span className="text-primary">Cart</span>{" "}
          </a>
        </div>
        <div className="min-w-max flex gap-4 items-center">
          <div className="relative ">
            <Search
              className="!text-3xl cursor-pointer hover:text-primary transitional"
              onClick={toggleSearch}
            />
            <div
              className={`${
                !searchOpen
                  ? "pointer-events-none opacity-0 top-20"
                  : "pointer-events-auto opacity-100 top-10"
              } absolute 550px:right-0 350px:-right-[10rem] -right-[11rem] shadow-md bg-white p-4 transitional min-w-max w-[1000%] !z-50`}
            >
              <MyInput
                placeholder="Search Here..."
                onChange={(e) => setSearchVal(e.target.value)}
                ref={searchRef}
                icon={<SearchOutlined className="inputIcon" onClick={search} />}
              />
            </div>
          </div>
          <div className="relative ">
            <PersonOutlined
              className="!text-3xl cursor-pointer hover:text-primary transitional"
              onClick={toggleAccount}
            />{" "}
            <div
              className={`${
                !accountOpen
                  ? "pointer-events-none opacity-0 top-20"
                  : "pointer-events-auto opacity-100 top-10"
              } flex flex-col gap-4 absolute right-0 shadow-md bg-white p-4 transitional min-w-max !z-50`}
            >
              {localStorage?.getItem("authTokenBuyer") ? (
                <a
                  href="#"
                  onClick={() => navigate("/buyer/dashboard")}
                  className="hover:text-primary transitional"
                >
                  My Account
                </a>
              ) : localStorage?.getItem("authTokenSeller") ? (
                <a
                  href="#"
                  onClick={() => navigate("/retailer/dashboard")}
                  className="hover:text-primary transitional"
                >
                  Dashboard
                </a>
              ) : localStorage?.getItem("authTokenAdmin") ? (
                <a
                  href="#"
                  onClick={() => navigate("/admin/dashboard")}
                  className="hover:text-primary transitional"
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => {
                    toggleAccount();
                    navigate("/signupPortals");
                  }}
                  className="hover:text-primary transitional"
                >
                  Sign Up
                </a>
              )}

              {localStorage?.getItem("authTokenBuyer") ||
              localStorage?.getItem("authTokenSeller") ||
              localStorage?.getItem("authTokenAdmin") ? (
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("authTokenBuyer");
                    localStorage.removeItem("authTokenSeller");
                    localStorage.removeItem("authTokenAdmin");
                    toggleAccount();
                    navigate("/");
                  }}
                  className="hover:text-primary transitional"
                >
                  Logout
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => {
                    toggleAccount();
                    navigate("/loginPortals");
                  }}
                  className="hover:text-primary transitional"
                >
                  Login
                </a>
              )}
            </div>
          </div>
          <div className="">
            <ShoppingCartOutlined
              onClick={toggleCart}
              className="!text-3xl cursor-pointer hover:text-primary transitional"
            />
            <MiniCart open={cartOpen} toggleCart={toggleCart} />
          </div>
        </div>
      </div>
      <nav className="flex items-center flex-wrap justify-center gap-8 mt-10">
        <div>
          <a
            onClick={() => navigate("/")}
            href="#"
            className="min-w-max hover:text-primary transitional text-base"
          >
            Home
          </a>
        </div>
        <div>
          <a
            onClick={() => navigate("/shop/null/null/null")}
            href="#"
            className="min-w-max hover:text-primary transitional text-base"
          >
            Shop
          </a>
        </div>{" "}
        <div className="group relative">
          <a
            onClick={() => navigate("/categories")}
            href="#"
            className="min-w-max text-nowrap hover:text-primary transitional text-base"
          >
            Categories <ChevronLeft className="-rotate-90 !text-lg" />
          </a>
          <div
            className={` absolute group-hover:top-5 group-hover:pointer-events-auto group-hover:opacity-100 top-16 opacity-0 450px:-left-[35vw] 350px:-left-[40vw] -left-[10vw] shadow-md bg-white p-4 transitional  pointer-events-none flex 400px:flex-row flex-wrap flex-col  gap-8 max-h-[80vh] h-[80vh] max-w-[80vw] w-[80vw] z-50`}
          >
            {categories?.length === 0 && (
              <div className="p-10 flex flex-col items-center">
                <Category className="!text-7xl" />
                <h6 className="text-neutral-500">No Category Created Yet!</h6>
              </div>
            )}
            {categories?.map((category, index) => {
              return (
                <div key={index} className="flex flex-col border-b-2 pb-4">
                  <a
                    className="my-4 font-bold min-w-max hover:text-primary transitional  cursor-pointer text-lg border-b py-2"
                    onClick={() => navigate(`/shop/${category._id}/null/null`)}
                  >
                    {category.name}
                  </a>
                  <div className="flex flex-col gap-3">
                    {category.subCategories.map((subCategory, subIndex) => {
                      return (
                        <a
                          key={subIndex}
                          onClick={() =>
                            navigate(`/shop/null/${subCategory._id}/null`)
                          }
                          href="#"
                          className="min-w-max hover:text-primary transitional text-base"
                        >
                          {subCategory.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <a
            onClick={() => navigate("/wishlist")}
            href="#"
            className="min-w-max hover:text-primary transitional text-base"
          >
            Wishlist
          </a>
        </div>{" "}
      </nav>
    </header>
  );
};

export default Header;
const MiniCart = ({ open, toggleCart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [changeInCart, setChangeInCart] = useState(false);
  const removeItem = (indexToRemove) => {
    const prevCartItems = cartItems;
    const newCartItems = prevCartItems.filter((item, index) => {
      return indexToRemove !== index;
    });
    console.log(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));

    setChangeInCart((prev) => !prev);
  };
  useEffect(() => {
    if (!localStorage) return;
    const cart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cart);
    setCartItems(parsedCart);
  }, [open, changeInCart]);
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${
          open
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed inset-0 bg-black z-40 transition-opacity`}
        onClick={toggleCart}
      />

      <div
        className={`${
          !open
            ? "pointer-events-none 1200px:-right-[35.333%] 1100px:-right-[40.333%] 950px:-right-[45.333%] 850px:-right-[50.333%] 750px:-right-[60%] 650px:-right-[70%] 550px:-right-[78%] 450px:-right-[100%]  350px:-right-[120%] -right-[150%]"
            : "pointer-events-auto right-0"
        } flex flex-col gap-4 h-screen overflow-y-auto border top-0 fixed z-50  md:w-1/3 550px:w-1/2 350px:w-3/4 w-full shadow-lg duration-300 bg-white 400px:p-10 p-5 rounded-tl-xl rounded-bl-xl transitional min-w-max`}
      >
        <div className="flex justify-between items-center border-b pb-8 border-neutral2-400">
          <h6>Cart</h6>
          <Close
            onClick={toggleCart}
            className="cursor-pointer hover:text-primary transitional"
          />
        </div>
        <div className="h-full space-y-2">
          {(cartItems?.length === 0 || !cartItems) && (
            <div className="flex h-full  flex-col items-center justify-center gap-5 ">
              <RemoveShoppingCart className="!text-9xl" />
              <p>Your cart is currently empty.</p>
            </div>
          )}
          {cartItems?.map((item, index) => {
            return (
              <CartItem
                item={item}
                key={index}
                index={index}
                removeItem={removeItem}
              />
            );
          })}
        </div>
        <MyButton
          text={"Checkout"}
          className={"!w-full"}
          onClick={() => {
            navigate("/checkout");
            toggleCart();
          }}
          disabled={cartItems?.length === 0 || !cartItems}
        />
      </div>
    </>
  );
};
const CartItem = ({ item = {}, removeItem, index }) => {
  const { productId, numberOfItems, color } = item;
  const { product } = useGetProduct(productId);
  return (
    <div className="rounded-lg border p-5 flex  gap-5 relative overflow-hidden group">
      <div
        className="p-2 absolute bg-white border rounded-lg -top-1/3 left-1/2 group-hover:top-1/2 group-hover:-translate-y-1/2 transitional cursor-pointer"
        onClick={() => removeItem(index)}
      >
        <Clear />
      </div>
      <div className="bg-neutral2-800 rounded-lg min-w-max overflow-hidden flex items-center justify-center">
        <img
          src={product?.images[0]}
          alt="productImage"
          className="max-w-full w-20  h-20 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <a className="hover:text-primary transitional cursor-pointer">
          {product?.name}
        </a>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <p>Color:</p>
            <div
              onClick={() => {}}
              style={{ backgroundColor: color }}
              className={` size-5 cursor-pointer rounded shadow text-center flex items-center justify-center `}
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <p>Items:</p>
            <p>{numberOfItems}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className={`${product?.salePrice && "line-through opacity-50"}`}>
            ${product?.originalPrice}
          </p>
          {product?.salePrice && (
            <p className="font-bold text-primary">${product?.salePrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};
