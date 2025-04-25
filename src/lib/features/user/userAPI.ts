import api from "../api/api";

const userAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userAPI;

export default userAPI;