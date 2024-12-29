"use client";
import { useSession } from "next-auth/react";
import { NotificationModal } from "~/entities/notification";
import { CreateNewTask } from "~/features/create-new-task";
import { SearchTasks } from "~/features/search-tasks";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";

export const Header = () => {
  const session = useSession();
  return (
    <header className="flex gap-4 items-center">
      <SearchTasks />
      <CreateNewTask />
      <NotificationModal />
      <Avatar>
        <AvatarFallback>
          {session.data?.user.name
            ?.split(" ")
            .map((el) => el.at(0))
            .join("")}
        </AvatarFallback>
        <AvatarImage
          src={session.data?.user.avatar ?? ""}
          alt={session.data?.user.name ?? ""}
        />
      </Avatar>
    </header>
  );
};
