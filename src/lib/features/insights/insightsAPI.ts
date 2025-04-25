import api from "../api/api";

const insightsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getInsights: builder.query({
      query: () => "/retirement-insights",
    }),

    updateInsights: builder.mutation({
      query: (data) => ({
        url: "/retirement-insights",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetInsightsQuery, useUpdateInsightsMutation } = insightsAPI;

export default insightsAPI;
