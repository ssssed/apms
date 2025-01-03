import { User as PrismaUser, Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Omit<PrismaUser, "id"> &
      DefaultSession["user"] & {
        id: string;
      };
  }

  interface User extends Omit<PrismaUser, "id"> {
    id: string; // Преобразуем id в строку
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<PrismaUser, "password"> {
    id: string;
  }
}
