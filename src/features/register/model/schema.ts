import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Введите валидный email"),
  name: z.string(),
  password: z.string(),
});

export type RegisterFormType = z.infer<typeof RegisterSchema>;