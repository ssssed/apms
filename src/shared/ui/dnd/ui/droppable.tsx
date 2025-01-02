"use client";
import React, { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({
  id,
  children,
  className,
}: PropsWithChildren & { id: string; className?: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = isOver
    ? {
        backgroundColor: "rgba(0, 128, 0, 0.1)", // Лёгкая подсветка при наведении
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {children}
    </div>
  );
}
