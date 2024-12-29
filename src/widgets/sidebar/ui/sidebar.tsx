import { Logo } from "./logo";
import { SidebarMenu } from "./menu";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-7">
      <Logo />
      <SidebarMenu />
    </aside>
  );
};
