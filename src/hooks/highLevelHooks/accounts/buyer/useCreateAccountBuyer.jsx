import { useEffect } from "react";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useNavigate } from "react-router-dom";

const useCreateAccountBuyer = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/buyer/create`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createAccount = async (data) => await refetch(data);
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/loginBuyer");
    }
  }, [fetchedData]);
  return { createAccount, fetching };
};

export default useCreateAccountBuyer;
