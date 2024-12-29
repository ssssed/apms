import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export const Box = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg shadow-[0px_1px_1.2999999523162842px_0px_rgba(0,0,0,0.07)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
