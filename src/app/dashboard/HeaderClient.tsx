"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function HeaderClient() {
  const pathname = usePathname();
  const { user } = useAuth();
  const size = pathname === "/dashboard" ? "lg" : "md";
  
  return (
    <Header 
      size={size} 
      name={user?.name || "Carregando..."} 
      subtitle={user?.nameComplement || ""}
      logo={user?.logo || ""}
    />
  );
}
