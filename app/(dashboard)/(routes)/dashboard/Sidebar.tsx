"use client";
// external imports
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LayoutDashboard,
  MessagesSquare,
  ImageIcon,
  MusicIcon,
  VideoIcon,
  SettingsIcon,
  CodeIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

// internal imports
import { Montserrat } from "next/font/google";
import { FreeCounter } from "@/components/ui/FreeCounter";
import { ProModal } from "@/components/ui/ProModal";
import { useProModal } from "@/hooks/useProModal";
import { Sheet, SheetClose, SheetTrigger } from "@/components/ui/sheet";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-500",
  },
  {
    label: "Audio Generation",
    icon: MusicIcon,
    href: "/audio",
    color: "text-emerald-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white",
  },
];

interface sidebarProps {
  apiLimitCount: number;
  isPro: boolean;
  isMobile?: boolean;
}

const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
  isMobile = false,
}: sidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="text-white space-y-4 py-4 flex flec-col h-full bg-[#111827]">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Brainy
          </h1>
        </Link>
        <div className="space-y-1">
          {!isMobile &&
            routes.map((route) => (
              <Link
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
                href={route.href}
                key={route.href}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          {isMobile &&
            routes.map((route) => (
              <SheetClose key={route.href} asChild>
                <Link
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href
                      ? "text-white bg-white/10"
                      : "text-zinc-400"
                  )}
                  href={route.href}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              </SheetClose>
            ))}
        </div>
        <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
    </div>
  );
};

export default Sidebar;
