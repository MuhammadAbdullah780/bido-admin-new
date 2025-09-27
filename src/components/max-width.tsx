import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";

//
type Props<T extends ElementType> = {
  as?: T;
  width?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "className">;

// Create a generic forwardRef component
const MaxWidth = forwardRef(
  <T extends ElementType = "div">(
    { as, width = 1440, className = "", ...props }: Props<T>,
    ref: any // We use any here because of the dynamic element type
  ) => {
    const Component = as || "div";

    return (
      <Component
        {...props}
        ref={ref}
        style={{ maxWidth: width }}
        className={cn("block m-auto", className)}
      />
    );
  }
);

// Add display name for better debugging
MaxWidth.displayName = "MaxWidth";

export default MaxWidth;
