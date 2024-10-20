import React from "react";
import Hero from "../components/Hero";
import useGetCategories from "../hooks/highLevelHooks/categories/useGetCategories";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const { categories } = useGetCategories();
  // const categories = [
  //   {
  //     name: "Electronics",
  //     image: "/shoes.png",
  //     products: ["", "", "", "", "", ""],
  //     subCategories: [
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Electronics",
  //     image: "/shoes.png",
  //     products: ["", "", "", "", "", ""],
  //     subCategories: [
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Electronics",
  //     image: "/shoes.png",
  //     products: ["", "", "", "", "", ""],
  //     subCategories: [
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //       {
  //         name: "Smart Watch",
  //         image: "/smart_watch.png",
  //         products: ["", "", "", "", "", ""],
  //       },
  //     ],
  //   },
  // ];
  return (
    <div className="">
      <Hero heading={"Our Collections"} path={"Categories"} />
      <div className="respPx20 my-20">
        {categories?.map((category, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h4>{category.name}</h4>
                <p className="font-bold">({category.products.length} Items)</p>
              </div>
              <div className="resp3ColGrid gap-8 my-10">
                {category.subCategories.map((subCategory, index) => {
                  return (
                    <SubCategoryCard
                      image={subCategory.image}
                      key={index}
                      items={subCategory.products.length}
                      name={subCategory.name}
                      id={subCategory._id}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
const SubCategoryCard = ({ image, name, items, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/shop/null/${id}`);
      }}
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
