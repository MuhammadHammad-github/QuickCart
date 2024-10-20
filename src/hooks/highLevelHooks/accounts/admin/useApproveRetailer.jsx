import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";

const useApproveRetailer = (retailerId) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/admin/approveRetailer`,
    "put",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id: retailerId,
    },
    {},
    false,
    false
  );
  return { approve: refetch, fetching };
};

export default useApproveRetailer;
