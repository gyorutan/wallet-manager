import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-black/85 h-screen">{children}</div>;
};

export default LandingLayout;
