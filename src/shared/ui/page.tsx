import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";

export const Page = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <main
      className={cn(
        "max-w-[1440px] w-full mx-auto py-4 px-8 h-full",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
