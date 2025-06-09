/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { TokenData } from "@/types/types";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  token: string | null;
  checkAuth: () => Promise<void>;
  credits: number;
  org: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [org] = useState<string | null>(null);
  const [credits] = useState<number>(0);

  const handleAuthFailure = () => {
    Cookies.remove("user_id");
    Cookies.remove("token");
    localStorage.removeItem("_ms-mid");
    localStorage.removeItem("_ms-mem");
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null);
    router.push("/");
  };

  const checkAuth = async () => {
    if (typeof window === "undefined") return;

    try {
      const { default: lyzr } = await import("lyzr-agent");
      const tokenData = (await lyzr.getKeys()) as unknown as TokenData[];

      console.log("Token data", tokenData);

      if (tokenData && tokenData[0]) {
        Cookies.set("user_id", tokenData[0].user_id);
        Cookies.set("token", tokenData[0].api_key);

        // call the api for checking the credits
        setIsAuthenticated(true);
        setUserId(tokenData[0].user_id);
        setToken(tokenData[0].api_key);
      } else {
        console.log("Token data not found hanlding the auth failure");
        handleAuthFailure();
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      handleAuthFailure();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (typeof window === "undefined") return;

      try {
        const { default: lyzr } = await import("lyzr-agent");
        await lyzr.init("pk_c14a2728e715d9ea67bf");

        // Subscribe to auth state changes
        const unsubscribe = lyzr.onAuthStateChange(
          (isAuthenticated: boolean) => {
            if (isAuthenticated) {
              checkAuth();
            } else {
              handleAuthFailure();
            }
          }
        );

        // Initial auth check
        await checkAuth();

        return () => unsubscribe();
      } catch (err) {
        console.error("Init failed:", err);
        handleAuthFailure();
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userId,
        token,
        checkAuth,
        credits,
        org,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
