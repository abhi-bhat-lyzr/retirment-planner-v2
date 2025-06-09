import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/mongodb";
import User from "@/lib/mongodb/models/User";
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

    const user = await User.findOne({ user_id }).select([
      "-password",
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      '_user_id'
    ]);

    console.log("User", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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

    await connectDB();

    // Find the user first
    const existingUser = await User.findOne({ user_id });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update only the fields that are provided in the request body
    const updatedUser = await User.findOneAndUpdate(
      { user_id },
      { $set: body },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error in PUT /api/user:", error);

    // Handle validation errors
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: (error as MongooseError.ValidationError).errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
