import { cva, VariantProps } from "class-variance-authority";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

const typographyCva = cva("leading-none", {
  variants: {
    view: {
      primary: "text-neutral-800",
      secondary: "text-secondary",
      blured: "text-[#7f7f7f]",
      white: "text-white",
    },
    weight: {
      bold: "font-bold",
      normal: "font-normal",
    },
    size: {
      xs: "text-xs",
      m: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      title: "text-[42px]",
    },
    font: {
      manrope: "font-manrope",
      poppins: "font-poppins",
    },
  },
  defaultVariants: {
    view: "primary",
    size: "m",
    weight: "normal",
    font: "manrope",
  },
});

export const Typography = ({
  as = "p",
  children,
  className,
  font,
  size,
  weight,
  view,
  ...props
}: {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5";
} & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> &
  VariantProps<typeof typographyCva>) => {
  const Tag = as;
  return (
    <Tag
      className={cn(typographyCva({ className, view, weight, size, font }))}
      {...props}
    >
      {children}
    </Tag>
  );
};
