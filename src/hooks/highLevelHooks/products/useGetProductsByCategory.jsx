import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetProductsByCategory = (id) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/byCategory`,
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
//     productsByCategory: fetchedData?.items,
//     fetching,
//     getProductsByCategory: refetch,
//   };
// };
const useGetProductsByCategory = (id) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/byCategory`,
    ["products", { category: id }],
    { id },
    !!id && id !== "null"
  );
  return {
    productsByCategory: fetchedData?.items,
    fetching,
    getProductsByCategory: refetch,
  };
};
export default useGetProductsByCategory;
