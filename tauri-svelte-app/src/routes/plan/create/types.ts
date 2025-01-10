import { z } from "zod";

export const todoSchema = z.object({
  content: z.string().min(1, "content は必須です"),
});

export type Todo = z.infer<typeof todoSchema>;