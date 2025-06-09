import { NextResponse } from "next/server";
import { jobStorage } from "@/lib/supabase/jobStorage";
import agentRequest from "@/lib/lyzr-api-requests/lyzrAgentRequest";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    // Get token and userId from cookies
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("user_id")?.value;

    // Validate required parameters
    if (!token || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed: Missing credentials",
          error: "Missing token or userId",
        },
        {
          status: 401,
        }
      );
    }

    const { message, user_inputs } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    const jobId = await jobStorage.createJob("retirement-planner");

    if (!jobId) {
      return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
      );
    }

    let prompt = "";

    if (user_inputs) {
      prompt = `
      user details: ${JSON.stringify(user_inputs)}
      current user_input : ${message}
      `;
    } else {
      prompt = `
      current user message : ${message}
      `;
    }

    const sessionId = token + '-**-' + userId;
    
    console.log("prompt", prompt);
    console.log("Session Id", sessionId);

    processJob(jobId, prompt, userId, token, sessionId);

    return NextResponse.json({
      status: "success",
      jobId: jobId,
      error: null,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

const processJob = async (
  jobId: string,
  message: string,
  userId: string,
  apiKey: string,
  sessionId: string
) => {
  try {
    const response = await agentRequest(message, userId, apiKey, sessionId);

    const job = await jobStorage.getJob(jobId);

    if (!job) {
      return;
    }

    if (!response.success) {
      jobStorage.updateJob(jobId, {
        status: "failed",
        error_code: 500,
      });
      return;
    }

    jobStorage.appendResult(jobId, [response.data]);
  } catch (error) {
    console.error("Job Processing Error:", error);
    jobStorage.updateJob(jobId, {
      status: "failed",
      error: "Processing failed due to an error",
    });
  }
};
