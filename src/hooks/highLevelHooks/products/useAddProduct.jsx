import useFetch from "../../lowLevelHooks/useFetch";

const useAddProduct = () => {
  const { refetch, fetching } = useFetch(
    `api/product/create`,
    "POST",
    {
      authtoken: localStorage.getItem("authTokenSeller"),
    },
    {},
    false,
    false
  );
  const addProduct = async (data) => await refetch(data);
  return { addProduct, fetching };
};

export default useAddProduct;
