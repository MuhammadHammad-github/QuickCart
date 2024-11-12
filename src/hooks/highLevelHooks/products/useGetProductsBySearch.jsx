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
  const filteredItems = useMemo(() => {
    if (!fetchedData || !search) return [];

    const { items } = fetchedData;
    if (!items) return [];
    console.log("after check");
    return items.filter((item) => {
      console.log(search);
      console.log(item);
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
