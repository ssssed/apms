"use client";
import { BoardTask } from "~/entities/board";
import { Droppable } from "~/shared/ui/dnd";

type DroppableColumnProps = {
  column: BoardColumnType;
};

export const BoardColumn: React.FC<DroppableColumnProps> = ({ column }) => {
  return (
    <Droppable id={column.status}>
      <div className="p-4 bg-white rounded-md border border-[#eeeeee]">
        <h2 className="font-bold text-lg mb-2 text-nowrap">{column.label}</h2>
        <div className="space-y-2">
          {column.tasks
            .sort((a, b) => a.order - b.order)
            .map((task) => (
              <BoardTask key={task.id} task={task} columnId={column.status} />
            ))}
        </div>
      </div>
    </Droppable>
  );
};
