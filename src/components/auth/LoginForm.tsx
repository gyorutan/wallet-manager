"use client";

import useInput from "@/hooks/useInput";
import React, { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { userLogin } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuthStore } from "@/store/authStore";

export const LoginForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const email = useInput("");
  const password = useInput("");

  const { setUser } = useAuthStore();

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLoginInfo = {
      email: email.value,
      password: password.value,
    };

    try {
      setIsLoading(true);

      const data = await userLogin(userLoginInfo);

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        setError(data.message);
        email.reset();
        password.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="text-black min-w-[400px] flex flex-col gap-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Wallet Manager</h1>
      <h2 className="text-xl font-medium text-center">로그인</h2>
      <div className="flex flex-col gap-y-2 mt-4">
        <Label className="font-semibold">이메일</Label>
        <Input
          {...email.bind}
          type="email"
          placeholder="hello@example.com"
          className="placeholder:font-normal"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="font-semibold">비밀번호</Label>
        <Input
          {...password.bind}
          placeholder="password"
          className="placeholder:font-normal placeholder:tracking-normal tracking-[3px]"
          type="password"
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex flex-row justify-start gap-x-4 items-center">
            <AlertCircle className="h-6 w-6" />
            <p className="mb-[2px] font-semibold">{error}</p>
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!email.value || !password.value || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            잠시 기다려주세요
          </>
        ) : (
          "로그인"
        )}
      </Button>
      <div className="flex flex-row justify-center items-center">
        <Button asChild variant={"link"}>
          <Link href={"/auth/find-password"} className="font-medium">
            비밀번호 찾기
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/auth/register"} className="font-medium">
            계정 만들기
          </Link>
        </Button>
      </div>
    </form>
  );
};
