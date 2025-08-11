import { baseApi } from "@/redux/baseApi";
import { ILogin, IRegister, IResponse, ISendOTP } from "@/types";
import { ILoginResponse } from "@/types/response/LoginResponse";
import { IRegisterResponse } from "@/types/response/RegisterResonse";

const authApi = baseApi.injectEndpoints({
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
    verifyOTP: builder.mutation({
      query: (otpInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: otpInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} = authApi;
