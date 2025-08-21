import { baseApi } from "@/redux/baseApi";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivisions: builder.query({
      query: (params) => ({
        url: "/division",
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DIVISION"],
    }),
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-type/${tourTypeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetDivisionsQuery,
  useRemoveTourTypeMutation,
} = authApi;
