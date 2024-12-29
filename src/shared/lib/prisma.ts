import { PrismaClient } from "@prisma/client";

// Типизация для глобального объекта (в TypeScript нужно указать, что prisma может быть добавлен к глобальному объекту)
declare global {
  var prisma: PrismaClient | undefined;
}

export let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // В продакшн-режиме всегда создается новый клиент
  prisma = new PrismaClient();
} else {
  // В dev-режиме создаем клиент один раз, чтобы избежать излишних подключений в hot-reloading
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}
