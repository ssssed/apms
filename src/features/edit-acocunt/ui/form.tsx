"use client";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button } from "~/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { EditAccountType } from "../model/schema";
import { updateAccount } from "../model/model";
import { signIn, useSession } from "next-auth/react";

type Props = {
  account: EditAccountType;
};

export const EditAccountForm = (props: Props) => {
  const session = useSession();
  const { account } = props;

  const form = useForm<EditAccountType>({
    defaultValues: {
      id: account.id ?? "-1",
      firstName: account.firstName ?? "",
      lastName: account.lastName ?? "",
      displayRole: account.displayRole ?? "",
      tel: account.tel ?? "",
    },
  });

  const handleSubmit = async (values: EditAccountType) => {
    const updated = await updateAccount(values);

    if (+account.id === +session.data?.user.id!) {
      session.update({
        ...session.data?.user,
        firstName: updated.firstName,
        lastName: updated.lastName,
        displayRole: updated.displayRole,
        tel: updated.tel,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-x-6 gap-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Должность</FormLabel>
              <FormControl>
                <Input placeholder="Должность" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="Телефон" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-1 w-fit mt-[27px]">
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </Form>
  );
};
