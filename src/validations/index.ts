import z from "zod";

export const registerRequest = z
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
export const loginRequest = z.object({
  userName: z.string().min(2).optional(),
  email: z.email().optional(),
  password: z.string().min(2),
});
export const resetPasswordRequest = z
  .object({
    oldPassword: z.string().min(2),
    password: z.string().min(2),
    confirmPassword: z.string().min(2),
  })
  .refine(
    ({ password: newpass, confirmPassword: confirm }) => newpass === confirm,
    {
      message: "newpassword and confirmPassword should be equal",
      path: ["confirmPassword"],
    },
  );
export const validatedId = z.uuid();
export const notesParams = z.object({
  id: validatedId,
});
export const noteRequest = z.object({
  title: z.string(),
  synopsis: z.string(),
  content: z.string(),
});

export const bookMarkToogle = z.object({
  BookMarked: z.boolean(),
});
export const profileRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  username: z.string(),
});
