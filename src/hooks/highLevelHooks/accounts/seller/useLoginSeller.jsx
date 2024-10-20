import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginSeller = () => {
  const navigate = useNavigate();
  const { refetch, fetchedData, fetching } = useFetch(
    `api/retailer/login`,
    "POST",
    {},
    {},
    true,
    false
  );
  const login = async (data) => await refetch(data);
  useEffect(() => {
    if (fetchedData && fetchedData?.success) {
      localStorage.setItem("authTokenSeller", fetchedData.authToken);
      fetchedData.authToken && navigate("/retailer/dashboard");
    }
  }, [fetchedData]);
  return { login, fetchedData, fetching };
};

export default useLoginSeller;
