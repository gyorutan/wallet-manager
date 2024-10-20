"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { userLogout } from "@/services/authService";
import toast from "react-hot-toast";

export const HomeHeader = () => {
  const { user, clearUser } = useAuthStore();

  const router = useRouter();

  const logout = async () => {
    const data = await userLogout();

    console.log({ data });

    if (data.success) {
      clearUser();
      toast.success(data.message);
      router.refresh();
      router.replace("/");
    }
  };

  return (
    <div className="fixed w-full bg-black/85 h-[60px] flex items-center px-4 justify-between">
      <span
        onClick={() => {
          router.push("/dashboard");
        }}
        className="text-2xl text-white font-bold cursor-pointer"
      >
        Wallet Manager
      </span>
      <div className="flex flex-row gap-x-4 items-center">
        {user && (
          <span className="text-white">{user?.username}님 환영합니다!</span>
        )}
        <Button onClick={logout} variant={"destructive"}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};
