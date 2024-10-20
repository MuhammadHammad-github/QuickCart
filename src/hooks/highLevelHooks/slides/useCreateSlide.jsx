import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useCreateSlide = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/slide/create`,
    "POST",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
    },
    {},
    true,
    false
  );
  const createSlide = async (body) => await refetch(body);
  return {
    fetching,
    createSlide,
  };
};

export default useCreateSlide;
