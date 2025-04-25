import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Gender = "male" | "female" | "other";
export type MaritalStatus = "single" | "married" | "divorced" | "widowed";

export interface User {
  is_profile_completed: boolean;
  user_inputs: UserInputs;
}

export interface UserInputs {
  age?: number;
  current_retirement_savings?: number;
  debts?: number;
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
  risk_appetite?: string;
}

const initialState: User = {
  is_profile_completed: false,
  user_inputs: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUserInputs: (state, action: PayloadAction<Partial<UserInputs>>) => {
      state.user_inputs = { ...state.user_inputs, ...action.payload };
    },
    resetUserInputs: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserInputs, resetUserInputs } = userSlice.actions;

export default userSlice.reducer;
