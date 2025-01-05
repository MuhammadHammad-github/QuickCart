import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetTotalProductsByRetailer = (id) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/totalProductsByRetailer`,
//     "GET",
//     {
//       id,
//     },
//     {},
//     false,
//     false
//   );
//   useEffect(() => {
//     if (!id || fetching) return;
//     refetch();
//   }, [id]);
//   return {
//     totalProducts: fetchedData?.totalItems,
//     fetching,
//     getTotalProducts: refetch,
//   };
// };
const useGetTotalProductsByRetailer = (id) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/totalProductsByRetailer`,
    ["totalProducts", { retailer: id }],
    { id },
    !!id
  );
  return {
    totalProducts: fetchedData?.totalItems,
    fetching,
    getTotalProducts: refetch,
  };
};

export default useGetTotalProductsByRetailer;
