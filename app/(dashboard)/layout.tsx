import React from "react";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "./(routes)/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:inset-y-0 md:fixed  z-[80] bg-gray-900">
        {" "}
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;