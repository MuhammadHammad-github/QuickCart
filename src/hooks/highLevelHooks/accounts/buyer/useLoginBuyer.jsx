import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginBuyer = () => {
  const navigate = useNavigate();
  const { refetch, fetchedData, fetching } = useFetch(
    `api/buyer/login`,
    "POST",
    {},
    {},
    true,
    false
  );
  const login = async (data) => await refetch(data);
  useEffect(() => {
    if (fetchedData && fetchedData?.success) {
      localStorage.setItem("authTokenBuyer", fetchedData.authToken);
      fetchedData.authToken && navigate("/buyer/dashboard");
    }
  }, [fetchedData]);
  return { login, fetchedData, fetching };
};

export default useLoginBuyer;
