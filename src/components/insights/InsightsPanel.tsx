"use client";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetInsightsQuery } from "@/lib/features/insights/insightsAPI";
import { useGetUserQuery } from "@/lib/features/user/userAPI";
import { setInsights } from "@/lib/features/insights/insightsSlice";
import { updateUserInputs } from "@/lib/features/user/userSlice";
import Insights from "./Insights";
import ProfileCompletion from "./ProfileCompletion";

const InsightsLoadingSkeleton = () => {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="p-4 bg-muted/50 border-b">
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2 mb-8">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10" />
            ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

const InsightsPanel = () => {
  const dispatch = useAppDispatch();
  const { insights } = useAppSelector((state) => state.insights);
  const { user_inputs } = useAppSelector((state) => state.user);

  const {
    data: fetchedInsights,
    isLoading: isInsightsLoading,
    refetch: refetchInsights,
  } = useGetInsightsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: fetchedUser,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Refetch data when store state changes
  useEffect(() => {
    const hasStoreUserInputs = Object.keys(user_inputs || {}).length > 0;
    const hasStoreInsights = Object.keys(insights || {}).length > 0;

    // If store has user inputs but API doesn't, refetch user
    if (hasStoreUserInputs && !fetchedUser) {
      refetchUser();
    }

    // If store has insights but API doesn't, refetch insights
    if (hasStoreInsights && !fetchedInsights) {
      refetchInsights();
    }
  }, [
    user_inputs,
    insights,
    fetchedUser,
    fetchedInsights,
    refetchUser,
    refetchInsights,
  ]);

  // Update store with API data
  useEffect(() => {
    if (fetchedInsights?.data) {
      dispatch(setInsights(fetchedInsights.data));
    }
  }, [fetchedInsights, dispatch]);

  useEffect(() => {
    if (fetchedUser) {
      dispatch(updateUserInputs(fetchedUser));
    }
  }, [fetchedUser, dispatch]);

  if (isInsightsLoading || isUserLoading) {
    return <InsightsLoadingSkeleton />;
  }

  const hasUserInputs = Object.keys(user_inputs || {}).length > 0;
  const hasInsights = Object.keys(insights || {}).length > 0;

  return (
    <div className="h-full flex flex-col">
      {hasUserInputs && hasInsights ? (
        <div className="flex-1 overflow-y-auto">
          <Insights />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ProfileCompletion />
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;
