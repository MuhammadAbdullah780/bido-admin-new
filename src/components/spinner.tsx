import { cn } from "@/lib/utils";
import React from "react";

type SpinnerProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

const sizeClasses = {
  xs: "w-4 h-4 border-2",
  sm: "w-8 h-8 border-2", 
  md: "w-12 h-12 border-[3px]", // Changed border-3 to border-[3px] since border-3 is not a valid Tailwind class
  lg: "w-14 h-14 border-4"
} as const;

const Spinner = ({ className = "", size = "md" }: SpinnerProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div 
        className={cn(
          sizeClasses[size],
          "border-t-gray-200 border-b-black border-r-gray-200 border-l-black rounded-full animate-spin"
        )}
      ></div>
    </div>
  );
};

export default Spinner;