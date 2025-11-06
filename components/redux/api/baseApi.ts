// redux/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = fetchBaseQuery({
  baseUrl: "/api/",
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: api,
  endpoints: () => ({}),
});
