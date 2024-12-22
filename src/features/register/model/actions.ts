"use server";
import bcrypt from "bcrypt";
import { prisma } from "~/shared/lib/prisma";
import { RegisterFormType } from "./schema";

export const registerAction = async (data: RegisterFormType) => {
  console.log(data);
  const { email, password, name } = data;

  const candidate = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (candidate) {
    throw new Error("Неправильный логин или пароль");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });
};
