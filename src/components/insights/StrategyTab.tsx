import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useAppSelector } from '@/lib/hook'

const StrategyTab = () => {
  const { insights } = useAppSelector((state) => state.insights);

  console.log("insights", insights);
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

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Asset Allocation</CardTitle>
          <CardDescription>Your current investment mix</CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Stocks</span>
                <span className="text-sm font-medium">
                  {insights?.asset_allocation?.stocks}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Bonds</span>
                <span className="text-sm font-medium">
                  {insights?.asset_allocation?.bonds}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Cash</span>
                <span className="text-sm font-medium">
                  {insights?.asset_allocation?.cash}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full rounded-full"
                  style={{ width: "5%" }}
                ></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Your allocation is appropriate for your age and risk tolerance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default StrategyTab;
