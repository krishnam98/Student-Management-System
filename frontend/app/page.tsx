"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import { decodeToken } from "@/utils/decodetoken";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    const decoded = decodeToken(token);

    if (decoded.role === "ADMIN") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/student");
    }
  }, []);

  return null; // no UI needed
}
