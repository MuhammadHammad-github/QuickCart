import React, { useState } from "react";
import MyModal from "./MyModal";
import MyButton from "./MyButton";
import { Check, Close } from "@mui/icons-material";
import AddToCartInput from "./AddToCartInput";

const QuickView = ({ open, setOpen, product = {} }) => {
  const [selectedColor, setSelectedColor] = useState(
    (product?.colors && product?.colors[0]) || ""
  );
  return (
    <MyModal
      open={open}
      setOpen={setOpen}
      className={
        "p-10 bg-white border-none outline-none rounded-lg   650px:w-[80%] 550px:w-[85%] w-[90%] "
      }
    >
      <div
        className="flex justify-end cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <Close />
      </div>
      <div className="grid grid-cols-6 gap-8">
        <div className="bg-neutral2-800 rounded-lg 1000px:col-span-3 col-span-6">
          <img
            src={product?.images[0]}
            alt="productImage"
            className="max-w-full h-[26rem] object-contain mx-auto"
          />
        </div>
        <div className="flex flex-col gap-4 1000px:col-span-3 col-span-6">
          <h4>{product.name}</h4>
          <div className="flex gap-2 items-center">
            <h3 className={`${product.salePrice && "line-through opacity-50"}`}>
              ${product.originalPrice}
            </h3>
            {product.salePrice && (
              <h3 className="font-bold ">${product.salePrice}</h3>
            )}
          </div>
          <p className="tracking-wider leading-relaxed text-[0.88rem]">
            {product.description}
          </p>
          <div>
            {product?.colors?.map((color, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                  style={{ backgroundColor: color }}
                  key={index}
                  className={`${
                    selectedColor === color &&
                    "shadow-md  outline-2 outline-double"
                  } size-10 cursor-pointer rounded shadow text-center flex items-center justify-center `}
                >
                  {selectedColor === color && (
                    <Check style={{ filter: "invert(100%)" }} />
                  )}
                </div>
              );
            })}
          </div>
          <AddToCartInput product={product} selectedColor={selectedColor} />
        </div>
      </div>
    </MyModal>
  );
};

export default QuickView;
// const AddToCartInput = () => {
//   const [selectedNumber, setSelectedNumber] = useState(1);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex gap-5 1250px:flex-row 1000px:flex-col 650px:flex-row flex-col"
//     >
//       <div className="flex items-stretch">
//         <span
//           onClick={() =>
//             setSelectedNumber((prev) => (prev > 1 && Number(prev) - 1) || prev)
//           }
//           className="font-bold text-2xl border py-3 px-4 cursor-pointer"
//         >
//           -
//         </span>
//         <input
//           type="number"
//           className="font-bold outline-none border text-center "
//           value={selectedNumber}
//           onChange={(e) => setSelectedNumber(e.target.value)}
//           min={1}
//         />
//         <span
//           onClick={() => setSelectedNumber((prev) => Number(prev) + 1)}
//           className="font-bold text-2xl border py-3 px-4 cursor-pointer"
//         >
//           +
//         </span>
//       </div>
//       <MyButton text={"Add To Cart"} type="submit" />
//     </form>
//   );
// };
