import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
}
