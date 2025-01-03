"use server";

import { prisma } from "~/shared/lib/prisma";

import { EditAccountType } from "./schema";

export const updateAccount = async (account: EditAccountType) => {
  const { id, ...data } = account;
  const update = await prisma.user.update({
    data,
    where: {
      id: +account.id,
    },
  });

  return update;
};
