"use client";
import React, { useState } from "react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import StrategyTab from "./StrategyTab";
import Overview from "./Overview";
import UserProfile from "./UserProfile";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div>
      <div className="p-4 bg-muted/50 border-b">
        <h2 className="text-xl font-bold">Retirement Insights</h2>
        <p className="text-sm text-muted-foreground">
          Analysis and recommendations for your retirement planning
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow flex flex-col min-h-0"
      >
        <div className="p-4 border-b bg-card">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-4 bg-muted/30 min-h-full">
            <TabsContent value="overview" className="mt-0 space-y-4">
              <Overview />
            </TabsContent>

            <TabsContent value="strategy" className="mt-0 space-y-4">
              <StrategyTab />
            </TabsContent>

            <TabsContent value="profile" className="mt-0 space-y-4">
              <UserProfile />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Insights;
