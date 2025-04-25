"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SendMessageRequest {
  sessionId: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_inputs: any;
}

interface SendMessageResponse {
  jobId: string;
  status: string;
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({

    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body,
      }),
    }),

    longPollMessage: builder.query({
      query: (jobId) => ({
        url: `/chat/status?jobId=${jobId}`,
        method: "GET",
      }),
    }),

    checkAuth: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useLongPollMessageQuery,
  useCheckAuthQuery,
} = api;

export default api;
