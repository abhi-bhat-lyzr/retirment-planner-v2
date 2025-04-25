"use client";
import { useCheckAuthQuery } from "@/lib/features/api/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const router = useRouter();

  const { isAuthenticated, isLoading: loading } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  const { data, isLoading, error } = useCheckAuthQuery(undefined, {
    skip: isAuthenticated,
  });

  console.log("Auth check Data", data);
  console.log("Error", error);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("Please login to continue");
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error</p>
      </div>
    );
  }

  return <>{children}</>;
}
