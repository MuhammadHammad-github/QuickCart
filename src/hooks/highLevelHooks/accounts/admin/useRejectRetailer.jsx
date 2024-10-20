import { useEffect } from "react";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useNavigate } from "react-router-dom";

const useRejectRetailer = (id) => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/admin/rejectRetailer`,
    "delete",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id,
    },
    {},
    true,
    false
  );
  const reject = async () => {
    console.log("running in the function");
    await refetch();
  };
  return { reject, rejecting: fetching };
};

export default useRejectRetailer;
