import { RegisterForm } from "@/components/auth/RegisterForm";
import React from "react";

export default function page() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
