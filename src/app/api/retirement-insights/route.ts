import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/mongodb";
import RetirementInsights from "@/lib/mongodb/models/RetirementInsights";
import { Error as MongooseError } from "mongoose";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    // Get token and userId from cookies
    const token = cookieStore.get("token")?.value;
    const user_id = cookieStore.get("user_id")?.value;

    // Validate required parameters
    if (!token || !user_id) {
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

    await connectDB();

    const insights = await RetirementInsights.findOne({ user_id });

    if (!insights) {
      return NextResponse.json(
        {
          success: false,
          message: "Retirement insights not found",
          error: "No insights found for this user",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: insights,
    });
  } catch (error) {
    console.error("Error in GET /api/retirement-insights:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to fetch retirement insights",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Get token and userId from cookies
    const token = cookieStore.get("token")?.value;
    const user_id = cookieStore.get("user_id")?.value;

    // Validate required parameters
    if (!token || !user_id) {
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

    const body = await request.json();

    console.log("body", body);

    await connectDB();

    // Find the insights first
    const existingInsights = await RetirementInsights.findOne({ user_id });

    if (!existingInsights) {
      // If no existing insights, create new one
      const newInsights = new RetirementInsights({
        user_id,
        ...body,
      });

      await newInsights.save();

      return NextResponse.json({
        success: true,
        message: "Retirement insights created successfully",
        data: newInsights,
      });
    }

    // Update existing insights
    const updatedInsights = await RetirementInsights.findOneAndUpdate(
      { user_id },
      { $set: body },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    return NextResponse.json({
      success: true,
      message: "Retirement insights updated successfully",
      data: updatedInsights,
    });
  } catch (error) {
    console.error("Error in PUT /api/retirement-insights:", error);

    // Handle validation errors
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          error: (error as MongooseError.ValidationError).errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to update retirement insights",
      },
      { status: 500 }
    );
  }
}
