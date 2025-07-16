import { Prisma } from "@prisma/client";
import z from "zod";

export const registerUser = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    username: z.string().min(2),
    password: z.string().min(2),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password == confirmPassword, {
    message: "password and confirmPassword should be equal",
    path: ["confirmPassword"],
  });
