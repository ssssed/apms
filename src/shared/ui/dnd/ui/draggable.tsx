"use client";
import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable({
  id,
  data,
  children,
  onClick,
}: PropsWithChildren & {
  id: string;
  data?: Record<string, any>;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data, // Передаём данные о задаче или колонке
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Останавливаем все события DnD
    event.preventDefault();
    event.stopPropagation();

    if (onClick) onClick(event);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className="cursor-move"
    >
      {children}
    </div>
  );
}
