import { useNavigate } from "react-router-dom";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect, useState } from "react";
import { useFetchQuery } from "../../../lowLevelHooks/useFetchQueries";

// const useGetSeller = () => {
//   const navigate = useNavigate();
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/retailer/`,
//     "GET",
//     {
//       authtoken: localStorage.getItem("authTokenSeller"),
//     },
//     {},
//     false,
//     false
//   );
//   useEffect(() => {
//     const token = localStorage.getItem("authTokenSeller");
//     if (token) refetch();
//   }, []);
//   useEffect(() => {
//     if (!fetchedData) return;
//     if (fetchedData?.action === "logout") {
//       localStorage.removeItem("authTokenSeller");
//       navigate("/loginSeller");
//     }
//   }, [fetchedData]);
//   return { sellerData: fetchedData?.account, fetching };
// };
const useGetSeller = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/retailer/`,
    ["retailer", token],
    { authtoken: token },
    !!token
  );
  useEffect(() => {
    const token = localStorage.getItem("authTokenSeller");
    if (token) setToken(token);
  }, []);
  useEffect(() => {
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authTokenSeller");
      navigate("/loginSeller");
    }
  }, [fetchedData]);
  return { sellerData: fetchedData?.account, fetching };
};

export default useGetSeller;
