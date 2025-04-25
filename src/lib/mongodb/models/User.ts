import mongoose, { Schema, Document } from "mongoose";

export type Gender = "male" | "female" | "other";
export type MaritalStatus = "single" | "married" | "divorced" | "widowed";

export interface IUser extends Document {
  user_id: string;
  age?: number;
  current_retirement_savings?: number;
  debts?: number;
  lifestyle_expectation : string;
  desired_retirement_age?: number;
  expected_inflation_rate?: number;
  expected_pension?: number;
  gender?: Gender;
  healthcare_costs_estimate?: number;
  location?: string;
  marital_status?: MaritalStatus;
  monthly_income?: number;
  monthly_savings?: number;
  other_passive_income?: number;
  target_savings_rate?: number;
  name: string;
  risk_appetite?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age cannot be more than 120"],
    },
    current_retirement_savings: {
      type: Number,
      min: [0, "Current retirement savings cannot be negative"],
    },
    debts: {
      type: Number,
      min: [0, "Debts cannot be negative"],
    },
    desired_retirement_age: {
      type: Number,
      min: [30, "Desired retirement age must be at least 30"],
      max: [100, "Desired retirement age cannot be more than 100"],
    },
    expected_inflation_rate: {
      type: Number,
      min: [0, "Expected inflation rate cannot be negative"],
      max: [100, "Expected inflation rate cannot be more than 100"],
    },
    expected_pension: {
      type: Number,
      min: [0, "Expected pension cannot be negative"],
    },
    gender: {
      type: String,
    },
    healthcare_costs_estimate: {
      type: Number,
      min: [0, "Healthcare costs estimate cannot be negative"],
    },
    location: {
      type: String,
      trim: true,
    },
    marital_status: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    monthly_income: {
      type: Number,
      min: [0, "Monthly income cannot be negative"],
    },
    monthly_savings: {
      type: Number,
      min: [0, "Monthly savings cannot be negative"],
    },
    other_passive_income: {
      type: Number,
      min: [0, "Other passive income cannot be negative"],
    },
    target_savings_rate: {
      type: Number,
      min: [0, "Target savings rate cannot be negative"],
      max: [100, "Target savings rate cannot be more than 100"],
    },
    name: {
      type: String,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    risk_appetite: {
      type: String,
      trim: true,
    },
    lifestyle_expectation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
