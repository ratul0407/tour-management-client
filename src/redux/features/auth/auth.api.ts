import { baseApi } from "@/redux/baseApi";
import { ILogin, IRegister, IResponse, ISendOTP, IVerifyOTP } from "@/types";
import { ILoginResponse } from "@/types/response/LoginResponse";
import { IRegisterResponse } from "@/types/response/RegisterResonse";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
      query: (otpInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: otpInfo,
      }),
    }),
    verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (otpInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: otpInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useGetMeQuery,
  useLogOutMutation,
} = authApi;
