import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useUpdateProduct = (id) => {
  const { refetch, fetching } = useFetch(
    `api/product/update`,
    "PUT",
    {
      authtoken: localStorage.getItem("authTokenSeller"),
      id,
    },
    {},
    true,
    false
  );

  const updateProduct = async (data) => await refetch(data);
  return { updateProduct, fetching };
};

export default useUpdateProduct;
