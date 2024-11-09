import React, { lazy, Suspense, useEffect, useState } from "react";
import MyLoader from "../../components/MyLoader";
const WishlistCard = lazy(() => import("./components/WishlistCard"));
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
      <Suspense fallback={<MyLoader />}>
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
      </Suspense>
    </div>
  );
};

export default Wishlist;
