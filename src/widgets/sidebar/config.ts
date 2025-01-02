import {
  HouseIcon,
  ListTodoIcon,
  LucideProps,
  MessageSquareTextIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ROUTER } from "~/shared/lib/router";

type MenuItemType = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  link: string;
};

type MenuGroupType = {
  group: string;
  menu: MenuItemType[];
};

const navigationItems: MenuItemType[] = [
  {
    icon: HouseIcon,
    label: "Дашборд",
    link: ROUTER.pages.HOME,
  },
  {
    icon: ListTodoIcon,
    label: "Список задач",
    link: ROUTER.pages.TASKS,
  },
  {
    icon: MessageSquareTextIcon,
    label: "Чат",
    link: ROUTER.pages.CHAT,
  },
];

const accountItems: MenuItemType[] = [
  {
    icon: UserRoundIcon,
    label: "Профиль",
    link: ROUTER.pages.PROFILE,
  },
  {
    icon: SettingsIcon,
    label: "Настройки",
    link: ROUTER.pages.CHAT,
  },
];

export const sidebarGroups: MenuGroupType[] = [
  {
    group: "Меню",
    menu: navigationItems,
  },
  {
    group: "Аккаунт",
    menu: accountItems,
  },
];
