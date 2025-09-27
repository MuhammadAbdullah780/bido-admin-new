"use client";
import { useMemo } from "react";
import { X } from "lucide-react";

// Components
import { SideLink } from "./side-links";

// Utils
import { cn } from "@/lib/utils";

// Constants
import { APP_LINKS } from "@/constants/app-links";

// Context
import { useSidebar } from "@/contexts/sidebar-context";

const Sidebar = () => {
  // Vars
  const appRoutes = useMemo(() => APP_LINKS, []);
  const { isMobileSidebarOpen, closeMobileSidebar } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col bg-[#101828] text-gray-300 print:hidden",
          "transition-all duration-300 ease-in-out",
          "w-64 h-screen",
          // Mobile: fixed position with slide animation
          "fixed md:relative z-50 md:z-auto",
          "transform md:transform-none",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sGPqgwH2YkU3gYjddnSkaT4XFQcaRl.png"
          alt="Logo"
          className="h-8 w-8"
        />
        {/* Mobile close button */}
        <button
          onClick={closeMobileSidebar}
          className="md:hidden p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-gray-300" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 hide-scroll min-h-0 space-y-2 px-3 py-4 overflow-y-auto">
        {appRoutes.map((item) => (
          <SideLink key={item.title} config={item} />
        ))}
      </nav>
      </aside>
    </>
  );
};

export { Sidebar };
