import useFetch from "../../../lowLevelHooks/useFetch";

const useCheckAdmin = () => {
  const { fetchedData } = useFetch(`api/admin/checkAdmin`);
  return { adminData: fetchedData };
};

export default useCheckAdmin;
