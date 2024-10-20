import React, { useEffect, useState } from "react";
import calculatePercentage from "../utils/calculatePercentage";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  Visibility,
} from "@mui/icons-material";
import QuickView from "./QuickView";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
const ProductCardList = ({ product }) => {
  const navigate = useNavigate();
  const { name, originalPrice, salePrice, description, images } = product;
  const [open, setOpen] = useState(false);

  const [changeInWishlist, setChangeInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    if (!localStorage) return;
    const wishlist = localStorage.getItem("wishlist");
    const parsedWishlist = JSON.parse(wishlist);

    setWishlist(parsedWishlist);
  }, [changeInWishlist]);
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCartItem = {
      productId: product._id,
      numberOfItems: 1,
      color: product.colors[0],
    };
    const existingCartItem = cart.find(
      (item) =>
        item.productId === product._id && item.color === product.colors[0]
    );

    if (!existingCartItem) {
      cart.push(newCartItem);
    } else {
      existingCartItem.numberOfItems += 1;
    }

    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      enqueueSnackbar({
        message: "Product Added To Cart",
        variant: "success",
      });
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };
  const addToWishlist = () => {
    const prevWishlist = JSON.parse(localStorage.getItem("cart"));

    const newItem = product._id;
    prevWishlist.push(newItem);

    try {
      localStorage.setItem("wishlist", JSON.stringify(prevWishlist));
      setChangeInWishlist((prev) => !prev);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };
  const removeFromWishlist = (id) => {
    const prevWishlist = wishlist;
    const newWishlist = prevWishlist.filter((item, index) => {
      return id !== item;
    });
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setChangeInWishlist((prev) => !prev);
  };

  return (
    <div className="flex 950px:flex-row flex-col relative fadeIn">
      <QuickView open={open} setOpen={setOpen} product={product} />

      <div
        className="bg-neutral2-800 rounded-lg relative productCardImage cursor-pointer  950px:w-[50%] w-full"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {salePrice && (
          <div className="absolute top-2 right-2 text-xs bg-accent p-1 px-2 rounded text-white">
            -{calculatePercentage(salePrice, originalPrice)}%
          </div>
        )}
        <img
          src={images[0]}
          alt="productImage"
          className="mx-auto object-cover max-w-full h-60 productImage1 transitional"
        />
        <img
          src={images[1] || images[0]}
          alt="productImage"
          className="object-contain max-w-full h-full w-full absolute top-0 left-0 productImage2 transitional"
        />
      </div>
      <div>
        <div className="flex flex-col !justify-between   gap-3 p-5">
          <a
            onClick={() => navigate(`/product/${product._id}`)}
            className=" cursor-pointer hover:text-primary transition-all"
          >
            {name}
          </a>
          <div className="flex gap-2 items-center ">
            <p className={`${salePrice && "line-through opacity-50"}`}>
              ${originalPrice}
            </p>
            {salePrice && (
              <p className="font-bold text-primary">${salePrice}</p>
            )}
          </div>
          <p>{description}</p>
        </div>
        <div className="transitional flex gap-2 items-center p-5">
          <div
            className="bg-white hover:bg-primary-300 cursor-pointer hover:text-white transitional rounded-lg p-1 px-3 shadow-lg"
            title="Quick view"
            onClick={() => setOpen(true)}
          >
            <Visibility className="!text-lg" />
          </div>
          <div
            className="bg-white hover:bg-primary-300 cursor-pointer hover:text-white transitional rounded-lg p-1 px-3 shadow-lg"
            onClick={addToCart}
            title="Add to cart"
          >
            <AddShoppingCart className="!text-lg" />
          </div>
          <div
            className="bg-white hover:bg-primary-300 cursor-pointer hover:text-white transitional rounded-lg p-1 px-3 shadow-lg"
            title="Add to wishlist"
            onClick={
              wishlist && wishlist?.includes(product._id)
                ? () => removeFromWishlist(product._id)
                : () => addToWishlist(product._id)
            }
          >
            {wishlist?.includes(product._id) ? (
              <FavoriteOutlined className="!text-lg" />
            ) : (
              <FavoriteBorder className="!text-lg" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
