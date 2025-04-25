import { NextResponse } from "next/server";
import User from "@/lib/mongodb/models/User";
import connectDB from "@/lib/mongodb/mongodb";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get the cookies instance
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

    // Connect to MongoDB
    await connectDB();

    try {
      // Check if user exists
      const existingUser = await User.findOne({ user_id: userId });

      if (existingUser) {
        // Verify if token matches
        if (existingUser.apiKey === token) {
          // Create response
          const response = NextResponse.json(
            {
              success: true,
              message: "Authentication successful",
              user: {
                user_id: existingUser.user_id,
              },
            },
            { status: 200 }
          );
          return response;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Authentication failed: Invalid token",
              error: "Token mismatch",
            },
            { status: 401 }
          );
        }
      }

      // If user doesn't exist, create new user
      const newUser = await User.create({
        user_id: userId,
        apiKey: token,
      });

      const response = NextResponse.json(
        {
          success: true,
          message: "Authentication successful",
          user: {
            user_id: newUser.user_id,
          },
        },
        { status: 200 }
      );
      return response;
    } catch (dbError) {
      console.error("Database operation failed:", dbError);

      return NextResponse.json(
        {
          success: false,
          message: "Database operation failed",
          error: "Internal server error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
