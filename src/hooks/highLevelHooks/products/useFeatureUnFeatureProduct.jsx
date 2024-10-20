import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useFeatureUnFeatureProduct = (id) => {
  const { refetch, fetching } = useFetch(
    `api/product/featureUnFeature`,
    "PUT",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id,
    },
    {},
    true,
    false
  );

  const featureUnFeatureProduct = async () => await refetch();
  return { featureUnFeatureProduct, fetching };
};

export default useFeatureUnFeatureProduct;
