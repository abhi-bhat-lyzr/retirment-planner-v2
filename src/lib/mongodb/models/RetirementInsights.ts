import mongoose, { Schema, Document } from "mongoose";

export interface IRetirementInsights extends Document {
  user_id: string;
  status: string;
  savings_gap: number;
  retirement_readiness: {
    message: string;
    score: number;
  };
  recommended_savings_rate: {
    recommended_savings_rate: number;
    message: string;
    projected_current_retirement_savings: number;
    monthly_contribution_needed: number;
    retirement_income_gap: number;
  };
  asset_allocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const retirementInsightsSchema = new Schema<IRetirementInsights>(
  {
    user_id: {
      type: String,
      required: [true, "User ID is required"],
      ref: "User",
    },
    status: {
      type: String,
    },
    savings_gap: {
      type: Number,
      required: [true, "Savings gap is required"],
      default: 0,
    },
    retirement_readiness: {
      message: {
        type: String,
        required: [true, "Retirement readiness message is required"],
      },
      score: {
        type: Number,
        required: [true, "Retirement readiness score is required"],
        min: [0, "Score cannot be negative"],
        max: [100, "Score cannot be more than 100"],
      },
    },
    recommended_savings_rate: {
      recommended_savings_rate: {
        type: Number,
        required: [true, "Recommended savings rate is required"],
      },
      message: {
        type: String,
        required: [true, "Recommendation message is required"],
      },
      projected_current_retirement_savings: {
        type: Number,
      },
      projected_retirement_savings: {
        type: Number,
      },
      monthly_contribution_needed: {
        type: Number,
        required: [true, "Monthly contribution needed is required"],
      },
      retirement_income_gap: {
        type: Number,
        required: [true, "Retirement income gap is required"],
      },
    },
    asset_allocation: {
      stocks: {
        type: Number,
        required: [true, "Stocks allocation is required"],
        min: [0, "Stocks allocation cannot be negative"],
        max: [100, "Stocks allocation cannot be more than 100"],
      },
      bonds: {
        type: Number,
        required: [true, "Bonds allocation is required"],
        min: [0, "Bonds allocation cannot be negative"],
        max: [100, "Bonds allocation cannot be more than 100"],
      },
      cash: {
        type: Number,
        required: [true, "Cash allocation is required"],
        min: [0, "Cash allocation cannot be negative"],
        max: [100, "Cash allocation cannot be more than 100"],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for user_id and status for efficient queries
retirementInsightsSchema.index({ user_id: 1, status: 1 });

// Add a validator to ensure asset allocation totals 100%
retirementInsightsSchema.pre("save", function (next) {
  const total =
    this.asset_allocation.stocks +
    this.asset_allocation.bonds +
    this.asset_allocation.cash;

  if (Math.round(total) !== 100) {
    next(new Error("Asset allocation must total 100%"));
  }
  next();
});

export default mongoose.models.RetirementInsights ||
  mongoose.model<IRetirementInsights>(
    "RetirementInsights",
    retirementInsightsSchema
  );
