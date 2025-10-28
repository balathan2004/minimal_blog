import {
  AuthResponseConfig,
  ProfileResponseConfig,
} from "@/components/interfaces";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.mutation<ProfileResponseConfig, void>({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
    }),
    getProfile: builder.mutation<ProfileResponseConfig, string>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export default profileApi;
export const { useGetMyProfileMutation, useGetProfileMutation } = profileApi;
