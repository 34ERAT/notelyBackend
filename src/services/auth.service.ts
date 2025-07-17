import { User } from "@prisma/client";
import dbConnection from "../utils/dbConnection";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../config/config";

export async function createUser(newUser: User) {
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const user = await dbConnection.user.create({ data: newUser });
  return user;
}
export async function loginUser(userNameOrEmail: string, password: string) {
  const user = await dbConnection.user.findFirst({
    where: { OR: [{ username: userNameOrEmail }, { email: userNameOrEmail }] },
  });
  if (!user) return;

  const isValid = await bcrypt.compare(password, user?.password as string);
  if (!isValid) return;
  const { id, username: userName } = user;
  const accessToken = sign({ id, userName }, config.jwtSecret, {
    expiresIn: "15m",
  });
  const refreshToken = sign({ id, userName }, config.jwtSecretRefresh, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
}
export async function resetPassword(
  userId: string,
  newPassword: string,
  oldPassword: string,
) {
  const user = await dbConnection.user.findUnique({ where: { id: userId } });
  const isValid = await bcrypt.compare(oldPassword, user?.password as string);
  if (!isValid) return;
  newPassword = await bcrypt.hash(newPassword, 10);
  const newPass = await dbConnection.user.update({
    where: { id: userId },
    data: { password: newPassword },
  });
  return newPass;
}
