import { useEffect, useState, useMemo } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetProductsBySearch = (autoCall = true, search) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/all`,
    "GET",
    {},
    {},
    false,
    autoCall
  );
  console.log(fetchedData);
  const filteredItems = useMemo(() => {
    if (!fetchedData) return [];

    const { items } = fetchedData;
    if (!items) return [];
    console.log("after check");
    return items.filter((item) => {
      const { category, subCategory, name, description, details } = item;
      return (
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        subCategory.name.toLowerCase().includes(search.toLowerCase()) ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase()) ||
        details.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [fetchedData, search]);
  console.log(filteredItems);
  return {
    productsBySearch: filteredItems,
    fetching,
    getProductsBySearch: refetch,
  };
};

export default useGetProductsBySearch;
