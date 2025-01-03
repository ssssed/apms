"use client";
import { signOut, useSession } from "next-auth/react";
import { NotificationModal } from "~/entities/notification";
import { CreateNewTask } from "~/features/create-new-task";
import { SearchTasks } from "~/features/search-tasks";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
import { Button } from "~/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/ui/dropdown-menu";
import { Typography } from "~/shared/ui/typography";

export const Header = () => {
  const session = useSession();
  return (
    <header className="flex gap-4 items-center">
      <SearchTasks />
      <CreateNewTask />
      <NotificationModal />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {session.data?.user.firstName.at(0)}
              {session.data?.user.lastName.at(0)}
            </AvatarFallback>
            <AvatarImage
              src={session.data?.user.avatar ?? ""}
              alt={session.data?.user.firstName ?? ""}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Мой Аккаунт</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex gap-1">
            <Typography size={"sm"}>
              {session.data?.user.firstName} {session.data?.user.lastName}
              <Typography
                className="ml-1"
                view={"blured"}
                size={"xs"}
                as="span"
              >
                ({session.data?.user.role})
              </Typography>
            </Typography>
          </DropdownMenuLabel>
          {session.data?.user.displayRole && (
            <DropdownMenuLabel>
              {session.data?.user.displayRole}
            </DropdownMenuLabel>
          )}
          <DropdownMenuItem>
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => signOut()}
            >
              Выйти
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
