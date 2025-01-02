"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { BoardColumn } from "./column";
import { TaskStatus } from "@prisma/client";
import {
  getTasksWithUsers,
  injectTasksToBoard,
  updateTaskStatus,
} from "~/entities/board";
import { COLUMNS } from "../config";

export const Board = () => {
  const [columns, setColumns] = useState<BoardColumnType[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceId = active.data.current?.columnId as TaskStatus;
    const targetId = over.id as TaskStatus;

    if (!sourceId || sourceId === targetId) return;

    setColumns((prev) => {
      const sourceColumn = prev.find((col) => col.status === sourceId);
      const targetColumn = prev.find((col) => col.status === targetId);

      console.log(sourceColumn, targetColumn, active);

      if (!sourceColumn || !targetColumn) return prev;

      const taskIndex = sourceColumn.tasks.findIndex(
        (t) => +t.id === +active.id
      );
      if (taskIndex === -1) return prev;

      const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
      targetColumn.tasks.push(movedTask);

      if (active?.id) {
        updateTaskStatus(+active.id, targetColumn.status).catch(console.error);
      }

      return [...prev];
    });
  };

  const handleGetTasks = async () => {
    const tasks = await getTasksWithUsers();
    const boardTasks = injectTasksToBoard(tasks, COLUMNS);
    setColumns(boardTasks);
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-6 gap-4 p-4">
        {columns.map((column) => (
          <BoardColumn key={column.status} column={column} />
        ))}
      </div>
    </DndContext>
  );
};
