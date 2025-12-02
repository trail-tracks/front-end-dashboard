"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/Header";

export default function HeaderClient() {
  const pathname = usePathname();
  const size = pathname === "/dashboard" ? "lg" : "md";
  return <Header size={size} />;
}
