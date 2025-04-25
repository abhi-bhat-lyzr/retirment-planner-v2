import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Insights {
  status: string;
  savings_gap: number;
  retirement_readiness: {
    message: string;
    score: number;
  };
  recommended_savings_rate: {
    recommended_savings_rate: number;
    message: string;
    projected_retirement_savings: number;
    monthly_contribution_needed: number;
    retirement_income_gap: number;
  };
  asset_allocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
}

export interface InsightsState {
  insightsGathered: boolean;
  activeTab: "overview" | "savings" | "strategy" | "products";
  insights: Insights | null;
}

const initialState: InsightsState = {
  insightsGathered: false,
  activeTab: "overview",
  insights: null,
};

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    setInsightsGathered: (state, action: PayloadAction<boolean>) => {
      state.insightsGathered = action.payload;
    },
    setActiveTab: (
      state,
      action: PayloadAction<InsightsState["activeTab"]>
    ) => {
      state.activeTab = action.payload;
    },
    setInsights: (state, action: PayloadAction<Insights>) => {
      state.insights = action.payload;
    },
    resetInsights: (state) => {
      return { ...initialState, activeTab: state.activeTab };
    },
  },
});

export const { setInsightsGathered, setActiveTab, setInsights, resetInsights } =
  insightsSlice.actions;

export default insightsSlice.reducer;
