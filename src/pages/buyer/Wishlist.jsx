import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetProduct from "../../hooks/highLevelHooks/products/useGetProduct";
import { Clear } from "@mui/icons-material";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [changeInWishlist, setChangeInWishlist] = useState(false);
  useEffect(() => {
    const wishlist = localStorage.getItem("wishlist");
    if (!wishlist) return;
    setWishlistItems(JSON.parse(wishlist));
  }, [changeInWishlist]);

  return (
    <div className="respPx20 my-20">
      <h3>My Wishlist</h3>
      <div className="my-10">
        {wishlistItems.map((item, index) => {
          return (
            <WishlistCard
              item={item}
              key={index}
              index={index}
              setChangeInWishlist={setChangeInWishlist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;

const WishlistCard = ({ item, index, setChangeInWishlist }) => {
  const navigate = useNavigate();
  const { product, fetching } = useGetProduct(item);
  const removeItem = (indexToRemove) => {
    try {
      const prevWishlist = JSON.parse(localStorage.getItem("wishlist"));
      const newWishlistItems = prevWishlist.filter((item, index) => {
        return indexToRemove !== index;
      });
      localStorage.setItem("wishlist", JSON.stringify(newWishlistItems));
      setChangeInWishlist((prev) => !prev);
    } catch (error) {
      console.log(error.message);
      console.error(error);
      console.log("Error occurred while removing wishlist item!");
    }
  };

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
