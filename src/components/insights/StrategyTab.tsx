"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAppSelector } from "@/lib/hook";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

const StrategyTab = () => {
  const { insights } = useAppSelector((state) => state.insights);

  const assetAllocationData = insights?.asset_allocation
    ? [
        {
          name: "Stocks",
          value: insights.asset_allocation.stocks,
          color: "hsl(var(--chart-1))",
        },
        {
          name: "Bonds",
          value: insights.asset_allocation.bonds,
          color: "hsl(var(--chart-2))",
        },
        {
          name: "Cash",
          value: insights.asset_allocation.cash,
          color: "hsl(var(--chart-3))",
        },
      ]
    : [];

  return (
    <div className="space-y-4">
      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Savings Rate</CardTitle>
          <CardDescription>
            Your current contribution percentage
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">
                {insights?.recommended_savings_rate?.recommended_savings_rate}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {insights?.recommended_savings_rate?.message}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList
                    dataKey="name"
                    position="inside"
                    fill="white"
                    fontSize={12}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-center w-full">Based on your financial details</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StrategyTab;
