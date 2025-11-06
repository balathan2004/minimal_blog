import { AuthResponseConfig } from "@/components/interfaces";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    getLoginCred: builder.query<AuthResponseConfig, void>({
      query: (payload) => ({
        url: "/auth/get_login_cred",
      }),
    }),
  }),
});

export default authApi;
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetLoginCredQuery,
} = authApi;
