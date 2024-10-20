import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginAdmin = () => {
  const navigate = useNavigate();
  const { refetch, fetchedData, fetching } = useFetch(
    `api/admin/login`,
    "POST",
    {},
    {},
    true,
    false
  );
  const login = (data) => refetch(data);
  useEffect(() => {
    if (fetchedData && fetchedData?.success) {
      localStorage.setItem("authTokenAdmin", fetchedData.authToken);
      fetchedData.authToken && navigate("/admin/dashboard");
    }
  }, [fetchedData]);
  return { login, fetchedData, fetching };
};

export default useLoginAdmin;
