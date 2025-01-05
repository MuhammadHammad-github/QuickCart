import { useEffect, useState, useMemo } from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetProductsBySearch = (autoCall = true, search) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/all`,
//     "GET",
//     {},
//     {},
//     false,
//     autoCall
//   );
//   const filteredItems = useMemo(() => {
//     if (!fetchedData || !search) return [];

//     const { items } = fetchedData;
//     if (!items) return [];
//     return items.filter((item) => {
//       const { category, subCategory, name, description, details } = item;
//       return (
//         category.name.toLowerCase().includes(search.toLowerCase()) ||
//         subCategory.name.toLowerCase().includes(search.toLowerCase()) ||
//         name.toLowerCase().includes(search.toLowerCase()) ||
//         description.toLowerCase().includes(search.toLowerCase()) ||
//         details.toLowerCase().includes(search.toLowerCase())
//       );
//     });
//   }, [fetchedData, search]);
//   return {
//     productsBySearch: filteredItems,
//     fetching,
//     getProductsBySearch: refetch,
//   };
// };
const useGetProductsBySearch = (autoCall = true, search) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(`api/product/all`, [
    "products",
  ]);
  const filteredItems = useMemo(() => {
    if (!fetchedData || !search) return [];

    const { items } = fetchedData;
    if (!items) return [];
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
  return {
    productsBySearch: filteredItems,
    fetching,
    getProductsBySearch: refetch,
  };
};

export default useGetProductsBySearch;
