import { baseApi } from "@/redux/baseApi";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["BOOKING"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetAllBookingsQuery } = authApi;
