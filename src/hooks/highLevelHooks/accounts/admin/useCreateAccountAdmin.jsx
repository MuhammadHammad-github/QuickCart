import { useEffect } from "react";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useNavigate } from "react-router-dom";

const useCreateAccountAdmin = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/admin/create`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createAccount = (data) => refetch(data);
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/admin/login");
    }
  }, [fetchedData]);
  return { createAccount, fetching };
};

export default useCreateAccountAdmin;
