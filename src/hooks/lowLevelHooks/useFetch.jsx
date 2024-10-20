import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import backendUrl from "../../utils/backendUrl";

const useFetch = (
  api,
  method = "GET",
  headers,
  initialBody = {},
  showAlert,
  autoCall = true
) => {
  const defaultHeaders = { "content-type": "application/json" };
  const [fetchedData, setFetchedData] = useState();
  const [body, setBody] = useState(initialBody);
  const [fetching, setFetching] = useState(false);

  const fetchData = async (newBody = body) => {
    try {
      setFetching(true);
      const response = await fetch(`${backendUrl}/${api}`, {
        method,
        headers:
          (method === "POST" || method === "PUT") &&
          !(newBody instanceof FormData)
            ? { ...defaultHeaders, ...headers }
            : headers,
        ...(method !== "GET" && {
          body: newBody instanceof FormData ? newBody : JSON.stringify(newBody),
        }),
      });
      const json = await response.json();
      setFetchedData({ ...json, success: response.ok });
      showAlert &&
        response.ok &&
        enqueueSnackbar({
          message: json.message,
          variant: "success",
        });
      !response.ok &&
        enqueueSnackbar({
          message: json.message,
          variant: "error",
        });
    } catch (error) {
      console.log(
        "An error occurred in fetchData in useFetch hook",
        error.message
      );
      enqueueSnackbar({
        message: "Internal server error",
        variant: "error",
      });
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    autoCall && fetchData();
  }, []);

  return { fetchedData, refetch: fetchData, setBody, fetching };
};

export default useFetch;
