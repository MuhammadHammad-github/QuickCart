import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetProduct = (id) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/`,
//     "GET",
//     {
//       id,
//     },
//     {},
//     false,
//     false
//   );
//   useEffect(() => {
//     if (!id) return;
//     refetch();
//   }, [id]);
//   return {
//     product: fetchedData?.item,
//     fetching,
//     getProduct: refetch,
//   };
// };

const useGetProduct = (id) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/`,
    ["products", id],
    { id },
    !!id
  );
  return {
    product: fetchedData?.item,
    fetching,
    getProduct: refetch,
  };
};

export default useGetProduct;
