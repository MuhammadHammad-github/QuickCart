import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetProductsBySubCategory = (id) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/bySubCategory`,
//     "GET",
//     { id },
//     {},
//     false,
//     false
//   );
//   useEffect(() => {
//     if (!id || id === "null") return;
//     refetch();
//   }, [id]);
//   return {
//     productsBySubCategory: fetchedData?.items,
//     fetching,
//     getProductsBySubCategory: refetch,
//   };
// };
const useGetProductsBySubCategory = (id) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/bySubCategory`,
    ["products", { subCategory: id }],
    { id },
    !!id && id !== "null"
  );
  return {
    productsBySubCategory: fetchedData?.items,
    fetching,
    getProductsBySubCategory: refetch,
  };
};
export default useGetProductsBySubCategory;
