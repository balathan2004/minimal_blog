// redux/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import authApi from "./authApi";
import { setAccessToken } from "./authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try refreshing the token
    const refreshResult = await rawBaseQuery(
      "/auth/getAccessToken",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log({refreshResult});
      const newAccessToken = (refreshResult.data as any).accessToken;
      api.dispatch(setAccessToken(newAccessToken));

      // Retry original query with new token
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
