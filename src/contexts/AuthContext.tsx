"use client";

import { getAuth } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

interface User {
  id: number;
  name: string;
  nameComplement?: string;
  email: string;
  phone: string;
  coverUrl?: string;
  entityId?: number;
}

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuth,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
