import { baseApi } from "@/redux/baseApi";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/auth/login",
        method: "POST",
        data: tourTypeName,
      }),
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useCreateTourTypeMutation, useGetTourTypesQuery } = authApi;
