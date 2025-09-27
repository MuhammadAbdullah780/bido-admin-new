"use client";

import { cn } from "@/lib/utils";
import { PanelLeft, Menu } from "lucide-react";
import { ImageAvatar } from "./image-avatar";
import { useSidebar } from "@/contexts/sidebar-context";

export function Header() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="bg-white p-5 flex items-center gap-5 border-b">
      {/* Mobile hamburger menu */}
      <Menu
        onClick={toggleMobileSidebar}
        className={cn("stroke-gray1 cursor-pointer md:hidden")}
      />
      
      {/* Desktop sidebar toggle */}
      <PanelLeft
        onClick={() => {
          // dispatch(toggleSidebar());
        }}
        className={cn("stroke-gray1 cursor-pointer hidden md:block")}
      />
      
      <div className="flex-1" />
      <ImageAvatar
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
        alt="Avatar"
      />
    </header>
  );
}
