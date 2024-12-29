"use client";
import Link from "next/link";
import { createElement } from "react";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

import { usePathname } from "next/navigation";
import { cn } from "~/shared/lib/utils";
import { sidebarGroups } from "../config";

export const SidebarMenu = () => {
  const pathname = usePathname();
  return (
    <Box className="px-[19px] pb-8 flex flex-col gap-8 h-fit">
      {sidebarGroups.map((sidebarGroup) => (
        <div key={sidebarGroup.group}>
          <Typography className="pb-2" view={"blured"} size={"xs"}>
            {sidebarGroup.group}
          </Typography>
          <nav className="flex flex-col gap-3">
            {sidebarGroup.menu.map((menu) => (
              <Link
                href={menu.link}
                key={menu.link}
                className={cn(
                  "py-2 px-4 flex gap-2 transition-all rounded-[10px] hover:bg-neutral-50",
                  {
                    ["bg-neutral-800 !text-white hover:bg-neutral-800/95"]:
                      pathname === menu.link,
                  }
                )}
              >
                {createElement(menu.icon, {
                  color: pathname === menu.link ? "#FFFFFF" : "#7f7f7f",
                })}{" "}
                <Typography
                  view={pathname === menu.link ? "white" : "blured"}
                  weight={pathname === menu.link ? "bold" : "normal"}
                >
                  {menu.label}
                </Typography>
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </Box>
  );
};
