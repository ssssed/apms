import { User as PrismaUser, Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // id теперь строка
      role: PrismaUser["role"];
    } & DefaultSession["user"];
  }

  interface User extends Omit<PrismaUser, "id"> {
    id: string; // Преобразуем id в строку
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
