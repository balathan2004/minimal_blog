import {
  ProfileResponseConfig,
} from "@/components/interfaces";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<ProfileResponseConfig, void>({
      query: () => ({
        url: "/profile/get_my_profile",
      }),
    }),
    getProfile: builder.query<ProfileResponseConfig, string>({
      query: (userId) => ({
        url: `/profile/get_profile?userId=${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export default profileApi;
export const { useGetMyProfileQuery, useGetProfileQuery } = profileApi;
