"use client";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <button className="text-red-500" onClick={handleLogOut}>
      Logout
    </button>
  );
};

export default LogOut;
