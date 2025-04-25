import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithMongoose;

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) {
    console.log("🔄 Using existing connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ New database connection");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);

        // Authentication error handling
        if (error.code === 18) {
          console.error(
            "🔑 Authentication failed. Please check your username, password, and database permissions."
          );
        }

        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;

    // Connection state monitoring
    mongoose.connection.on("connected", () => {
      console.log("📡 MongoDB connected successfully to Content Generator");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB connection disconnected");
    });
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
