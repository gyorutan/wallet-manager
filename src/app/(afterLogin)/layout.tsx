import { HomeHeader } from "@/components/HomeHeader";
import { ToolBar } from "@/components/ToolBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white h-screen">
      <HomeHeader />
      <ToolBar />
      {children}
    </div>
  );
};

export default MainLayout;
