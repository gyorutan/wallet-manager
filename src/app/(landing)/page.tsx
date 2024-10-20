"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

import Link from "next/link";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-y-12 p-[20px]">
        <h1 className="text-white text-5xl font-black">Wallet Manager</h1>
        {user && user.id ? (
          <div className="flex flex-col gap-y-6">
            <Button
              asChild
              variant={"secondary"}
              className="font-medium text-md"
            >
              <Link href={"/dashboard"}>대쉬보드로 돌아가기</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-6">
            <Button
              asChild
              variant={"secondary"}
              className="font-medium text-md"
            >
              <Link href={"/auth/login"}>로그인</Link>
            </Button>
            <Button
              asChild
              variant={"secondary"}
              className="font-medium text-md"
            >
              <Link href={"/auth/register"}>계정 만들기</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
