import React, { useEffect, useState } from "react";
import useGetProduct from "../hooks/highLevelHooks/products/useGetProduct";
import { Clear, RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetBuyer from "../hooks/highLevelHooks/accounts/buyer/useGetBuyer";
import MyButton from "../components/MyButton";
import CheckoutButton from "./buyer/components/CheckoutButton";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [totalSalePrice, setTotalSalePrice] = useState(0);
  const [changeInCart, setChangeInCart] = useState(false);
  const [prices, setPrices] = useState([]);
  const { buyerData } = useGetBuyer();
  const calculateTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.numberOfItems, 0);
  };
  const calculateTotalPrice = () => {
    const processedItems = new Set();

    const totalPrice = prices.reduce((total, item) => {
      const itemKey = `${item.id}-${item.color}`;

      if (processedItems.has(itemKey)) {
        return total;
      }

      processedItems.add(itemKey);

      return total + item.salePrice;
    }, 0);

    return totalPrice;
  };
  useEffect(() => {
    const authTokenBuyer = localStorage.getItem("authTokenBuyer");
    if (authTokenBuyer) return;
    navigate("/loginBuyer");
  }, []);
  useEffect(() => {
    console.log(prices);
    setTotalSalePrice(calculateTotalPrice());
  }, [prices]);
  useEffect(() => {
    if (!localStorage) return;
    const cart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cart);
    setCartItems(parsedCart);
  }, [changeInCart]);
  return (
    <div className="my-20 respPx20 grid grid-cols-3 gap-5 ">
      <div className="1000px:col-span-2 col-span-3">
        <h3 className="mb-10">
          <ShoppingCart /> Cart
        </h3>
        {cartItems.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <RemoveShoppingCart className="!text-9xl" />
            <p>Your cart is currently empty.</p>
          </div>
        )}
        {cartItems.map((item, index) => {
          return (
            <CartItem
              key={index}
              index={index}
              item={item}
              setChangeInCart={setChangeInCart}
              setPrices={setPrices}
            />
          );
        })}
      </div>
      <div className="shadow p-5 flex flex-col gap-4 1000px:col-span-1 col-span-3">
        <p className="font-medium">Total Cart Items: {calculateTotalItems()}</p>
        <p className="font-medium">Total Sale Price: ${totalSalePrice}</p>
        <p className="font-medium">Address: {buyerData?.address}</p>
        <CheckoutButton />
      </div>
    </div>
  );
};

export default Checkout;
const CartItem = ({ item = {}, index, setChangeInCart, setPrices }) => {
  const navigate = useNavigate();
  const { productId, numberOfItems, color } = item;
  const { product } = useGetProduct(productId);

  const removeItem = (indexToRemove) => {
    const prevCartItems = JSON.parse(localStorage.getItem("cart"));
    const newCartItems = prevCartItems.filter((item, index) => {
      return indexToRemove !== index;
    });
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setChangeInCart((prev) => !prev);
  };
  useEffect(() => {
    if (!product) return;
    setPrices((prices) => [
      ...prices,
      {
        salePrice: product.salePrice * numberOfItems,
        id: productId,
        color: color,
      },
    ]);
  }, [product]);
  return (
    <div className="rounded-lg border p-5 flex gap-5 relative overflow-hidden group">
      <div
        className="p-2 bg-white border rounded-lg absolute top-3 right-3 transitional cursor-pointer"
        onClick={() => removeItem(index)}
      >
        <Clear />
      </div>
      <div className="bg-neutral2-800 rounded-lg min-w-max overflow-hidden flex items-center justify-center">
        <img
          src={product?.images[0]}
          alt="productImage"
          className="max-w-full w-20 h-20 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <a
          onClick={() => navigate(`/product/${product?._id}`)}
          className="hover:text-primary transitional cursor-pointer"
        >
          {product?.name}
        </a>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <p>Color:</p>
            <div
              onClick={() => {}}
              style={{ backgroundColor: color }}
              className="size-5 cursor-pointer rounded shadow text-center flex items-center justify-center"
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
