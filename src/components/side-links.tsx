"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// Constants
import { APP_LINKS } from "@/constants/app-links";

// Utils
import { cn } from "@/lib/utils";

//
type Props = {
  config: (typeof APP_LINKS)[number];
};

//
const SideLink = ({ config }: Props) => {
  // States
  const [isOpen, setIsOpen] = useState(false);

  // Hooks
  const pathname = usePathname();
  const router = useRouter();

  // Vars
  const hasChildren = config?.innerRoutes && config?.innerRoutes?.length > 0;

  // Memo
  const isActive = useMemo(() => {
    return config.isMatched(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col text-gray1">
      <button
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
            return;
          }

          router.push(config.to);
        }}
        className={cn(
          "group flex items-center rounded-lg px-3 py-2 text-sm font-medium",
          "transition-colors duration-200",
          "hover:bg-[#1E2939] hover:text-white",
          isActive && "bg-[#1E2939] text-white",
          
        )}
      >
        <config.icon className="h-5 w-5 flex-shrink-0" />
        <span
          className={cn(
            "flex-1 text-left whitespace-nowrap",
            "ml-3 w-auto opacity-100"
          )}
        >
          {config.title}
        </span>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {/* Nested Items */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-auto" : "max-h-0"
          )}
        >
          <ul className="mt-1 space-y-1">
            {config.innerRoutes.map((child) => (
              <li
                key={child.to}
                onClick={() => {
                  router?.push(child.to);
                }}
                className={cn(
                  "flex items-center rounded-lg py-2 pl-10 pr-3 text-sm font-medium transition-colors",
                  "hover:bg-secondary_light hover:text-white",
                  child?.isMatched(pathname)
                    ? "bg-secondary_light text-white"
                    : ""
                )}
              >
                {child.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { SideLink };
