import React from "react";
import useFetch from "../../../lowLevelHooks/useFetch";

const useUpdateBuyer = () => {
  const { refetch, fetching, fetchedData } = useFetch(
    `api/buyer/update`,
    "PUT",
    { authtoken: localStorage.getItem("authTokenBuyer") },
    {},
    true,
    false
  );
  console.log(fetchedData);
  const updateAccount = async (data) => await refetch(data);
  return { updateAccount, fetching };
};

export default useUpdateBuyer;
