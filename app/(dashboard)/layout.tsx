import React from "react";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "./(routes)/dashboard/Sidebar";
import { getApiLimitCount } from "../../lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 md:fixed  bg-gray-900">
        {" "}
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
