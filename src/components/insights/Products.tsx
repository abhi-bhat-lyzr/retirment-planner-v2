import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const Products = () => {
  return (
    <div>
      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Target Date Fund</CardTitle>
          <CardDescription>
            Automatic asset allocation adjustment
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            A diversified investment portfolio that automatically adjusts to
            become more conservative as you approach your target retirement
            date.
          </p>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm font-medium">Expected annual return</div>
              <div className="text-xl font-bold">7.2%</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              Low Risk
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Index Fund Portfolio</CardTitle>
          <CardDescription>Low-cost market exposure</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            A portfolio of index funds providing broad market exposure with
            lower fees and passive management for long-term growth.
          </p>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm font-medium">Expected annual return</div>
              <div className="text-xl font-bold">8.5%</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
              Medium Risk
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Annuity</CardTitle>
          <CardDescription>Guaranteed income for life</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            A financial product that provides guaranteed income payments for
            life or a specified period, helping to ensure you don&apos;t outlive your
            savings.
          </p>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm font-medium">Expected annual return</div>
              <div className="text-xl font-bold">5.5%</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              Very Low Risk
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>

      <Card className="insight-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Dividend Growth Portfolio</CardTitle>
          <CardDescription>Income-focused investment strategy</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            A portfolio focused on stocks with growing dividend payments,
            providing both income and potential capital appreciation for
            retirement.
          </p>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm font-medium">Expected annual return</div>
              <div className="text-xl font-bold">7.8%</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
              Medium Risk
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Products