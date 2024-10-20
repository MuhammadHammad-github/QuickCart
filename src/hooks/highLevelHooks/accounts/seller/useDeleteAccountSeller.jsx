import { useEffect } from "react";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useNavigate } from "react-router-dom";

const useDeleteAccountSeller = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/retailer/delete`,
    "delete",
    {
      authtoken: localStorage.getItem("authTokenSeller"),
    },
    {},
    true,
    false
  );
  const deleteAccount = async (data) => await refetch(data);
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/loginSeller");
    }
  }, [fetchedData]);
  return { deleteAccount, fetching };
};

export default useDeleteAccountSeller;
