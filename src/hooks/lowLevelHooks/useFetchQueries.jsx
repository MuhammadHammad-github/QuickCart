import React, { useEffect, useState } from "react";
import backendUrl from "../../utils/backendUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const defaultHeaders = { "content-type": "application/json" };

const fetchFn = async (api, headers = {}, body = {}, method = "GET") => {
  if (!api) throw new Error("api is not defined");
  const response = await fetch(`${backendUrl}/${api}`, {
    method,
    headers:
      (method === "POST" || method === "PUT") && !(body instanceof FormData)
        ? { ...defaultHeaders, ...headers }
        : headers,
    ...(method !== "GET" && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  });
  if (response.ok) return response.json();
  response
    .json()
    .then((value) => {
      throw new Error(value.message || "Failed to fetch");
    })
    .catch(async (error) => {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to fetch");
    });
};

export const useFetchQuery = (
  api,
  queryKey,
  headers = {},
  enabled = true,
  body = {},
  method = "GET"
) => {
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState(null);
  const queryClient = useQueryClient();

  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  const { data, error, isLoading, isError } = useQuery({
    queryFn: () => fetchFn(api, headers, body, method),
    queryKey,
    enabled,
  });

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      enqueueSnackbar({ message: error.message, variant: "error" });
      return;
    }

    if (!data) return;

    if (data.action !== "logout") {
      setFetchedData({ ...data, success: true });
      return;
    }

    localStorage.removeItem("authTokenAdmin");
    localStorage.removeItem("authTokenSeller");
    localStorage.removeItem("authTokenBuyer");
    navigate("/loginPortals");
  }, [isError, isLoading, data]);

  return { fetching: isLoading, fetchedData, refetch };
};

export const useMutateQuery = (
  api,
  queryKey,
  headers = {},
  method = "POST",
  body = {}
) => {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState(null);
  const queryClient = useQueryClient();
  const { data, error, isError, isPending, mutate, mutateAsync } = useMutation({
    mutationFn: (newBody) => fetchFn(api, headers, newBody || body, method),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  useEffect(() => {
    if (isPending) return;
    if (isError) {
      enqueueSnackbar({ message: error.message, variant: "error" });
      return;
    }
    if (!data) return;
    if (data.action !== "logout") {
      setFetchedData({ ...data, success: true });
      return;
    }

    localStorage.removeItem("authTokenAdmin");
    localStorage.removeItem("authTokenSeller");
    localStorage.removeItem("authTokenBuyer");
    navigate("/loginPortals");
  }, [isError, isPending, data]);

  return { fetching: isPending, fetchedData, refetch: mutateAsync };
};
