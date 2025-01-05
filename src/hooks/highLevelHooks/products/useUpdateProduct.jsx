import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useMutateQuery } from "../../lowLevelHooks/useFetchQueries";

// const useUpdateProduct = (id) => {
//   const { refetch, fetching } = useFetch(
//     `api/product/update`,
//     "PUT",
//     {
//       authtoken: localStorage.getItem("authTokenSeller"),
//       id,
//     },
//     {},
//     true,
//     false
//   );

//   const updateProduct = async (data) => await refetch(data);
//   return { updateProduct, fetching };
// };
const useUpdateProduct = (id) => {
  const { refetch, fetching } = useMutateQuery(
    `api/product/update`,
    ["products"],
    {
      authtoken: localStorage.getItem("authTokenSeller"),
      id,
    },
    "PUT"
  );

  const updateProduct = async (data) => await refetch(data);
  return { updateProduct, fetching };
};

export default useUpdateProduct;
