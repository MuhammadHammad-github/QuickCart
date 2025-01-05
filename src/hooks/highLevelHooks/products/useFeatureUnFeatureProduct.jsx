import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useMutateQuery } from "../../lowLevelHooks/useFetchQueries";

// const useFeatureUnFeatureProduct = (id) => {
//   const { refetch, fetching } = useFetch(
//     `api/product/featureUnFeature`,
//     "PUT",
//     {
//       authtoken: localStorage.getItem("authTokenAdmin"),
//       id,
//     },
//     {},
//     true,
//     false
//   );

//   const featureUnFeatureProduct = async () => await refetch();
//   return { featureUnFeatureProduct, fetching };
// };
const useFeatureUnFeatureProduct = (id) => {
  const { refetch, fetching } = useMutateQuery(
    `api/product/featureUnFeature`,
    ["products"],
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id,
    },
    "PUT"
  );

  const featureUnFeatureProduct = async () => await refetch();
  return { featureUnFeatureProduct, fetching };
};

export default useFeatureUnFeatureProduct;
