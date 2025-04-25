"use client";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useAppDispatch } from "@/lib/hook";
import { useGetInsightsQuery } from "@/lib/features/insights/insightsAPI";
import { useGetUserQuery } from "@/lib/features/user/userAPI";
import { setInsights } from "@/lib/features/insights/insightsSlice";
import { updateUserInputs } from "@/lib/features/user/userSlice";
import Insights from "./Insights";
import ProfileCompletion from "./ProfileCompletion";

const InsightsLoadingSkeleton = () => {
  return (
    <div className="h-[90vh] flex flex-col space-y-4">
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

  const { data: fetchedInsights, isLoading: isInsightsLoading } =
    useGetInsightsQuery(undefined);
  const { data: fetchedUser, isLoading: isUserLoading } =
    useGetUserQuery(undefined);

  console.log("fetchedInsights", fetchedInsights);
  console.log("fetchedUser", fetchedUser);

  useEffect(() => {
    if (fetchedInsights) {
      dispatch(setInsights(fetchedInsights.data));
      console.log("fetchedInsights", fetchedInsights);
    }

    if (fetchedUser) {
      console.log("updating user inputs", fetchedUser);
      dispatch(updateUserInputs(fetchedUser));
    }
  }, [fetchedInsights, fetchedUser, dispatch]);

  if (isInsightsLoading || isUserLoading) {
    return <InsightsLoadingSkeleton />;
  }

  return (
    <div className="h-[90vh] flex flex-col">
      {fetchedUser && !fetchedInsights && <ProfileCompletion />}
      {fetchedUser && fetchedInsights && (
        <>
          <Insights />
        </>
      )}
    </div>
  );
};

export default InsightsPanel;
