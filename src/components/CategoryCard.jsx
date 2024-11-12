import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ image, name, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/shop/${id}/null/null`);
      }}
      className="flex flex-col categoryCard cursor-pointer mx-2"
    >
      <div className="rounded-lg overflow-hidden bg-gradient-to-b from-neutral2-800 to-neutral1 ">
        <img
          src={image}
          alt="categoryImage"
          className="max-w-full mx-auto h-64 object-cover"
        />
      </div>
      <a className="text-center w-full transitional  hover:text-primary cursor-pointer my-4">
        {name}
      </a>
    </div>
  );
};

export default CategoryCard;
