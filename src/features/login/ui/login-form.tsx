"use client";

import { Input } from "~/shared/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "~/shared/ui/button";
import Image from "next/image";
import google from "~/shared/assets/google-icon.svg";
import { Typography } from "~/shared/ui/typography";
import { LoginFormType, LoginSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTER } from "~/shared/lib/router";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const form = useForm<LoginFormType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const handleSubmit = async (values: LoginFormType) => {
    try {
      await signIn("credentials", {
        ...values,
        redirect: false,
      });
      console.log("actions after auth");

      router.replace(ROUTER.pages.HOME);
    } catch (e) {
      if (e instanceof Error) {
        form.setError("root", { message: e.message, type: "validate" });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Typography weight={"bold"} className="leading-[23px]">
                  Email
                </Typography>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Typography weight={"bold"} className="leading-[23px]">
                  Пароль
                </Typography>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <Typography className="text-red-400">
            {form.formState.errors.root.message}
          </Typography>
        )}
        <div className="flex gap-4 items-center">
          <Button className="w-full h-16">Войти</Button>
          <Image
            src={google}
            alt="google login button"
            role="button"
            width={32}
            height={32}
            className="box-content p-4 bg-[#FAFAFA] rounded-full border-2 border-solid border-neutral-150"
          />
        </div>
      </form>
    </Form>
  );
};
