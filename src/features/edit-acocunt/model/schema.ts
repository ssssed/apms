import { z } from "zod";

export const EditAccountSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  displayRole: z.string(),
  tel: z.string(),
});

export type EditAccountType = z.infer<typeof EditAccountSchema>;
