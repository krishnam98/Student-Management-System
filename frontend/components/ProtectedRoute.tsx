"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/utils/auth";
import { decodeToken } from "@/utils/decodetoken";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "ADMIN" | "STUDENT";
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    if (role) {
      const decoded = decodeToken(token);
      if (decoded.role !== role) {
        router.replace("/login");
      }
    }
  }, []);

  return <>{children}</>;
}
