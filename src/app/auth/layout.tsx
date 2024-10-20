import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-black/85 h-screen">{children}</div>;
};

export default AuthLayout;
