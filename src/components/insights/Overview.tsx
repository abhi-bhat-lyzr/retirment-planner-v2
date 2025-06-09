import { Info } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Calendar, TrendingUp } from "lucide-react";
import { useAppSelector } from "@/lib/hook";

const Overview = () => {
  const { insights } = useAppSelector((state) => state.insights);
  const { user_inputs } = useAppSelector((state) => state.user);
  return (
    <div className="space-y-4">
      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Retirement Readiness</CardTitle>
              <CardDescription>Your overall progress</CardDescription>
            </div>
            <Info className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Current Progress</span>
              <span className="text-sm font-medium">
                {insights?.retirement_readiness?.score}%
              </span>
            </div>
            <Progress
              value={insights?.retirement_readiness?.score}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">
              {insights?.retirement_readiness?.message}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Savings Gap</CardTitle>
              <CardDescription>Savings gap</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {
                  insights?.savings_gap
                    ?.toFixed(2)
                }
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {insights?.recommended_savings_rate?.message}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Monthly Income Needed</CardTitle>
              <CardDescription>Estimated for your retirement</CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {
                  insights?.recommended_savings_rate
                    ?.monthly_contribution_needed
                }
              </span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {insights?.recommended_savings_rate?.message}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Retirement Age</CardTitle>
              <CardDescription>Your projected retirement</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {user_inputs.desired_retirement_age}
              </span>
              <span className="text-sm text-muted-foreground">years old</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Increasing your savings rate by 3% could help you retire 2 years
              earlier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
