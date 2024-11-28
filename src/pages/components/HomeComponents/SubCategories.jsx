import React from "react";
import useGetSubCategories from "../../../hooks/highLevelHooks/subCategories/useGetSubCategories";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const SubCategories = () => {
  const { subCategories, fetching } = useGetSubCategories();

  return (
    <div className="grid 2xl:grid-cols-4 1150px:grid-cols-3 850px:grid-cols-2 grid-cols-1 gap-8 my-20">
      {fetching && (
        <>
          <SkeletonSubCategoryCard />
          <SkeletonSubCategoryCard />
          <SkeletonSubCategoryCard />
        </>
      )}
      {subCategories?.length > 0 &&
        subCategories?.map((item, index) => {
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
const SkeletonSubCategoryCard = () => {
  return (
    <div>
      <Skeleton variant="rectangular" className="w-full h-full" height={320} />
      <div className="flex flex-col items-center justify-center p-5 gap-2">
        <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "8rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "4rem" }} />
      </div>
    </div>
  );
};
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
          loading="lazy"
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
