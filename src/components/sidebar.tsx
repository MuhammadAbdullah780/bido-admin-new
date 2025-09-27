"use client";
import { useMemo } from "react";

// Components
import { SideLink } from "./side-links";

// Utils
import { cn } from "@/lib/utils";

// Constants
import { APP_LINKS } from "@/constants/app-links";

const Sidebar = () => {
  // Vars
  const appRoutes = useMemo(() => APP_LINKS, []);

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-[#101828] text-gray-300 print:hidden",
        "transition-all duration-300 ease-in-out",
        "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sGPqgwH2YkU3gYjddnSkaT4XFQcaRl.png"
          alt="Logo"
          className="h-8 w-8"
        />
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-2 px-3 py-4">
        {appRoutes.map((item) => (
          <SideLink key={item.title} config={item} />
        ))}
      </nav>
    </aside>
  );
};

export { Sidebar };
