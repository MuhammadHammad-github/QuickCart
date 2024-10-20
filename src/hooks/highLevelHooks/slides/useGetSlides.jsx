import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetSlides = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/slide/`);
  return {
    slides: fetchedData?.items,
    fetching,
    getSlides: refetch,
  };
};

export default useGetSlides;
