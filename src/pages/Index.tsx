
import React from "react";
import { Toaster } from "sonner";
import CafeApp from "@/components/CafeApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <Toaster position="top-right" />
      <CafeApp />
    </div>
  );
};

export default Index;
