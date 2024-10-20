import useFetch from "../../lowLevelHooks/useFetch";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCreateSubCategory = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `api/subCategory/create`,
    "POST",
    { authtoken: localStorage.getItem("authTokenAdmin") },
    {},
    true,
    false
  );
  const createSubCategory = async (data) => {
    await refetch(data);
  };
  useEffect(() => {
    if (fetchedData) {
      // fetchedData.success && navigate("/admin/subCategories");
    }
  }, [fetchedData]);
  return { createSubCategory, fetching };
};

export default useCreateSubCategory;
