import React from 'react'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '../ui/card';
import { PieChart } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useAppSelector } from '@/lib/hook';

const SavingsTab = () => {
  const { insights } = useAppSelector((state) => state.insights);
  console.log("insights", insights);
  return (
    <div>
      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Current Savings</CardTitle>
              <CardDescription>Your retirement accounts</CardDescription>
            </div>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">401(k)</span>
                <span className="text-sm font-medium">$125,000</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Roth IRA</span>
                <span className="text-sm font-medium">$42,500</span>
              </div>
              <Progress value={insights?.retirement_readiness?.score} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Taxable Brokerage</span>
                <span className="text-sm font-medium">$35,000</span>
              </div>
              <Progress value={17} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">$202,500</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

     
    </div>
  );
}

export default SavingsTab