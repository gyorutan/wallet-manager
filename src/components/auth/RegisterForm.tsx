"use client";

import useInput from "@/hooks/useInput";
import React, { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { userRegister } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const username = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const userRegisterInfo = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    console.log({ userRegisterInfo });

    try {
      setIsLoading(true);
      if (password.value != passwordConfirm.value) {
        setError("비밀번호가 일치하지 않습니다.");
        passwordConfirm.reset();
        return;
      }
      const data = await userRegister(userRegisterInfo);
      console.log({ data });
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/login");
      } else if (!data.success && data.errorCode === "username") {
        setError(data.message);
        username.reset();
      } else if (!data.success && data.errorCode === "email") {
        setError(data.message);
        email.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="text-black min-w-[400px] flex flex-col gap-y-4"
    >
      <h1 className="text-2xl font-black text-center">Wallet Manager</h1>
      <h2 className="text-xl font-semibold text-center">계정 만들기</h2>
      <div className="flex flex-col gap-y-2 mt-4">
        <Label className="font-semibold">닉네임</Label>
        <Input
          {...username.bind}
          placeholder="홍길동"
          className="placeholder:font-normal"
        />
      </div>
      <div className="flex flex-col gap-y-2">
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
      <div className="flex flex-col gap-y-2">
        <Label className="font-semibold">비밀번호 확인</Label>
        <Input
          {...passwordConfirm.bind}
          placeholder="password check"
          className="placeholder:font-normal placeholder:tracking-normal tracking-[3px]"
          type="password"
        />
      </div>
      {error && (
        <Alert variant="destructive" className="">
          <AlertDescription className="flex flex-row justify-start gap-x-4 items-center">
            <AlertCircle className="h-6 w-6" />
            <p className="mb-[2px] font-semibold">{error}</p>
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={
          !email.value ||
          !email.value ||
          !password.value ||
          !passwordConfirm.value ||
          isLoading
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            잠시 기다려주세요
          </>
        ) : (
          "가입"
        )}
      </Button>
      <div className="flex flex-row justify-center items-center">
        <Button asChild variant={"link"}>
          <Link href={"/"} className="font-medium">
            메인으로
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/auth/login"} className="font-medium">
            로그인
          </Link>
        </Button>
      </div>
    </form>
  );
};
