"use client";
import { TaskStatus } from "@prisma/client";
import { cn } from "~/shared/lib/utils";
import { Draggable } from "~/shared/ui/dnd";
import { Typography } from "~/shared/ui/typography";
import { BoardTasksListType } from "../model";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
import { moment } from "~/shared/lib/time";
import { MessageCircleIcon } from "lucide-react";
import { getContrastColor } from "~/shared/lib/contrast";

type DraggableTaskProps = {
  task: BoardTasksListType;
  columnId: TaskStatus;
};

export const BoardTask: React.FC<DraggableTaskProps> = ({ task, columnId }) => {
  return (
    <Draggable id={task.id.toString()} data={{ columnId }}>
      <div
        className={cn(
          "bg-white p-2 rounded shadow border flex flex-col gap-1",
          "hover:bg-gray-50"
        )}
      >
        <Typography
          weight={"bold"}
          size={"xs"}
          className="line-clamp-3 cursor-pointer"
        >
          {task.Project.name}
        </Typography>
        <hr className="mb-1" />
        <div className="flex flex-wrap gap-1">
          {task.Project.tags.map((tag) => (
            <div
              key={tag.id}
              className="p-2 text-xs font-medium leading-none rounded"
              style={{
                backgroundColor: tag.color,
                color: getContrastColor(tag.color),
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <Typography weight={"bold"} className="line-clamp-3">
          {task.title}
        </Typography>
        <div className="flex gap-0.5 items-center text-[#808080]">
          <MessageCircleIcon size={12} />
          <span className="text-[10px] font-semibold">
            {task.TaskComment.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Typography view={"blured"} size={"xs"}>
            {moment(task.updatedAt).fromNow()}
          </Typography>
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={task.User.avatar ?? ""}
              width={24}
              height={24}
              alt={task.User.firstName}
            />
            <AvatarFallback>
              {task.User.firstName.at(0)}
              {task.User.lastName.at(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Draggable>
  );
};
