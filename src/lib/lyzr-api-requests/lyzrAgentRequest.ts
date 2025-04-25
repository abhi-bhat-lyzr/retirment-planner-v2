import axios, { AxiosError } from "axios";

const lyzrAgentRequest = axios.create({
  baseURL: "https://agent-prod.studio.lyzr.ai/v3/inference/chat/",
});

const agentRequest = async (
  message: string,
  userId: string,
  apiKey: string,
  sessionId: string
) => {
  try {
    console.log("Agent Call log -> session Id", sessionId);
    console.log("Agent Call log -> api Key", apiKey);
    console.log("Agent Call log -> user Id", userId);

    const response = await lyzrAgentRequest.post(
      "/",
      {
        agent_id: process.env.AGENT_ID,
        message: message,
        session_id: sessionId,
      },
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    return {
      data: response.data,
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: null,
        success: false,
        error: error.response?.data,
      };
    }
    return {
      data: null,
      success: false,
      error: error,
    };
  }
};

export default agentRequest;
