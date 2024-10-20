import useFetch from "../../lowLevelHooks/useFetch";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCreateCategory = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/category/create`,
    "POST",
    { authtoken: localStorage.getItem("authTokenAdmin") },
    {},
    true,
    false
  );
  const createCategory = async (data) => {
    await refetch(data);
  };
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/admin/categories");
    }
  }, [fetchedData]);
  return { createCategory, fetching };
};

export default useCreateCategory;
