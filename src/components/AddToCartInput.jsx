import React, { useState } from "react";
import MyButton from "./MyButton";
import { enqueueSnackbar } from "notistack";

const AddToCartInput = ({ product, selectedColor }) => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCartItem = {
      productId: product._id,
      numberOfItems: selectedNumber,
      color: selectedColor,
    };

    const existingCartItem = cart.find(
      (item) => item.productId === product._id && item.color === selectedColor
    );

    if (!existingCartItem) {
      cart.push(newCartItem);
    } else {
      existingCartItem.numberOfItems += selectedNumber;
    }

    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      enqueueSnackbar({ message: "Product Added To Cart", variant: "success" });
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-5 1250px:flex-row 1000px:flex-col 650px:flex-row flex-col"
    >
      <div className="flex items-stretch">
        <span
          onClick={() =>
            setSelectedNumber((prev) => (prev > 1 && Number(prev) - 1) || prev)
          }
          className="font-bold text-2xl border py-3 px-4 cursor-pointer"
        >
          -
        </span>
        <input
          type="number"
          className="font-bold outline-none border text-center "
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          min={1}
        />
        <span
          onClick={() => setSelectedNumber((prev) => Number(prev) + 1)}
          className="font-bold text-2xl border py-3 px-4 cursor-pointer"
        >
          +
        </span>
      </div>
      <MyButton
        text={product.stock < 1 ? "Sold Out" : "Add To Cart"}
        disabled={product.stock < 1}
        type="submit"
      />
    </form>
  );
};

export default AddToCartInput;
