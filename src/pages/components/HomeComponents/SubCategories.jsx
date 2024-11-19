import React from "react";
import useGetSubCategories from "../../../hooks/highLevelHooks/subCategories/useGetSubCategories";
import { useNavigate } from "react-router-dom";

const SubCategories = () => {
  const { subCategories } = useGetSubCategories();
  if (subCategories?.length > 0)
    return (
      <div className="grid 2xl:grid-cols-4 1150px:grid-cols-3 850px:grid-cols-2 grid-cols-1 gap-8 my-20">
        {subCategories?.map((item, index) => {
          return (
            <SubCategoryCard
              image={item.image}
              name={item.name}
              items={item.products.length}
              id={item._id}
              key={index}
            />
          );
        })}
      </div>
    );
};

export default SubCategories;
const SubCategoryCard = ({ image, name, items, id }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/shop/null/${id}/null`);
  };
  return (
    <div
      onClick={onClick}
      className="rounded-xl overflow-hidden group cursor-pointer"
    >
      <div className="bg-gradient-to-t from-neutral2-800 to-neutral1">
        <img
          src={image}
          alt="subCategoryImage"
          className="max-w-full object-cover h-80 mx-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-5 gap-2">
        <h6 className="group-hover:text-primary transitional">{name}</h6>
        <p className="text-sm">({items} Items)</p>
      </div>
    </div>
  );
};
