import { useEffect } from "react";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useNavigate } from "react-router-dom";

const useCreateAccountSeller = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/retailer/create`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createAccount = async (data) => await refetch(data);
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/loginSeller");
    }
  }, [fetchedData]);
  return { createAccount, fetching };
};

export default useCreateAccountSeller;
