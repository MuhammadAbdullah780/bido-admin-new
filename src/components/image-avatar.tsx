import { cva, VariantProps } from "class-variance-authority";
import React from "react";

//
type Props = VariantProps<typeof imageAvtarVariants> &
  React.ComponentProps<"img"> & {};

// Variants
const imageAvtarVariants = cva(
  //
  ["inline-block"],
  {
    variants: {
      size: {
        xs: "size-8",
        sm: "size-[38px]",
        base: "size-[46px]",
        lg: "size-[62px]",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      size: "base",
      rounded: true,
    },
  }
);

//
const ImageAvatar = ({
  rounded,
  size,
  className,
  src = "#",
  alt = "#",
  ...props
}: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      className={imageAvtarVariants({ rounded, size })}
      {...props}
    />
  );
};

export { ImageAvatar };
