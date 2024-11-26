import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "./components/MyTable";
import { useParams } from "react-router-dom";
import useGetProductsByCategory from "../../hooks/highLevelHooks/products/useGetProductsByCategory";
import useGetProductsBySubCategory from "../../hooks/highLevelHooks/products/useGetProductsBySubCategory";
import useGetRetailerProducts from "../../hooks/highLevelHooks/products/useGetRetailerProducts";
import useGetProducts from "../../hooks/highLevelHooks/products/useGetProducts";
import useFeatureUnFeatureProduct from "../../hooks/highLevelHooks/products/useFeatureUnFeatureProduct";
import { Star, StarBorder } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const ProductsAdmin = () => {
  const [productsToShow, setProductsToShow] = useState([]);
  const params = useParams();
  const { category, subCategory, store } = params;
  const {
    productsByCategory,
    getProductsByCategory,
    fetching: fetchingProductsByCategory,
  } = useGetProductsByCategory(category);
  const {
    productsBySubCategory,
    getProductsBySubCategory,
    fetching: fetchingProductsBySubCategory,
  } = useGetProductsBySubCategory(subCategory);
  console.log(productsBySubCategory);
  const {
    retailerProducts,
    getProducts: getProductsByRetailer,
    fetching: fetchingProductsByRetailer,
  } = useGetRetailerProducts(store);
  const {
    products,
    getProducts,
    fetching: fetchingProducts,
  } = useGetProducts();
  const refetch = () => {
    if (category && category !== "null") getProductsByCategory();
    else if (subCategory && subCategory !== "null") getProductsBySubCategory();
    else if (store && store !== "null") getProductsByRetailer();
    else getProducts();
  };
  useEffect(() => {
    if (
      !products &&
      !productsByCategory &&
      !productsBySubCategory &&
      !retailerProducts
    )
      return;
    if (products) setProductsToShow(products);
    if (productsByCategory) setProductsToShow(productsByCategory);
    if (productsBySubCategory) setProductsToShow(productsBySubCategory);
    if (retailerProducts) setProductsToShow(retailerProducts);
  }, [products, productsByCategory, productsBySubCategory, retailerProducts]);
  // const products = [
  //   {
  //     images: ["/shoes.png", "/shoes_white.png"],
  //     name: "Mens Shoes, Good For Jogging",
  //     originalPrice: "300",
  //     salePrice: "200",
  //     description:
  //       "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
  //     sales: 4,
  //     retailer: {
  //       storeName: "ABC Store",
  //     },
  //     stock: "5",
  //   },
  //   {
  //     images: ["/shoes_white.png"],
  //     name: "Mens Shoes, Good For Jogging",
  //     originalPrice: "100",
  //     salePrice: "75",
  //     description:
  //       "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
  //     sales: 2,
  //     retailer: {
  //       storeName: "ABC Store",
  //     },
  //     stock: "5",
  //   },
  //   {
  //     images: ["/purse_khaki.png"],
  //     name: "Mens Shoes, Good For Jogging",
  //     originalPrice: "100",
  //     salePrice: "75",
  //     description:
  //       "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
  //     sales: 3,
  //     retailer: {
  //       storeName: "ABC Store",
  //     },
  //     stock: "5",
  //   },
  //   {
  //     images: ["/smart_watch.png"],
  //     name: "Mens Shoes, Good For Jogging",
  //     originalPrice: "100",
  //     salePrice: "75",
  //     description:
  //       "Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum ",
  //     sales: 2,
  //     retailer: {
  //       storeName: "ABC Store",
  //     },
  //     stock: "5",
  //   },
  // ];
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <h3 className="my-10"> Seller Products</h3>
        {(fetchingProducts ||
          fetchingProductsByCategory ||
          fetchingProductsBySubCategory ||
          fetchingProductsByRetailer) && <CircularProgress />}
        <MyTable
          cols={[
            "Image",
            "Name",
            "Original Price",
            "Sale Price",
            "Category",
            "Sub Category",
            "Stock",
            "Feature",
          ]}
        >
          {productsToShow?.map((product, index) => {
            return (
              <ProductRow
                index={index}
                key={index}
                product={product}
                refetch={refetch}
              />
            );
          })}
        </MyTable>
      </div>
    </div>
  );
};

export default ProductsAdmin;
const ProductRow = ({ product, index, refetch }) => {
  const { featureUnFeatureProduct } = useFeatureUnFeatureProduct(product._id);
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-100"}`} key={index}>
      <td className="border px-4 py-2">
        <img
          loading="lazy"
          src={product.images[0]}
          alt="productImage"
          className="max-w-full object-contain size-12"
        />
      </td>
      <td className="border px-4 py-2">{product.name}</td>
      <td className="border px-4 py-2">{product.originalPrice}</td>
      <td className="border px-4 py-2">{product.salePrice}</td>
      <td className="border px-4 py-2">{product.category.name}</td>
      <td className="border px-4 py-2">{product.subCategory.name}</td>
      <td className="border px-4 py-2">{product.stock}</td>
      <td className="border px-4 py-2">
        {" "}
        <a
          onClick={async () => {
            await featureUnFeatureProduct();
            refetch();
          }}
          className="cursor-pointer text-primary"
        >
          {!product.featured ? <StarBorder /> : <Star />}
        </a>
      </td>
    </tr>
  );
};
