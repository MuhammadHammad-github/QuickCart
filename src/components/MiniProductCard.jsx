import React from "react";
import { useNavigate } from "react-router-dom";

const MiniProductCard = ({ image, name, originalPrice, salePrice, id }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border p-5 flex  gap-5">
      <div className="bg-neutral2-800 rounded-lg min-w-max overflow-hidden">
        <img
          src={image}
          alt="productImage"
          className="max-w-full w-20  h-20 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <a
          onClick={() => {
            navigate(`/product/${id}`);
          }}
          className="hover:text-primary transitional cursor-pointer"
        >
          {name}
        </a>
        <div className="flex gap-2 items-center">
          <p className={`${salePrice && "line-through opacity-50"}`}>
            ${originalPrice}
          </p>
          {salePrice && <p className="font-bold text-primary">${salePrice}</p>}
        </div>
      </div>
    </div>
  );
};

export default MiniProductCard;
