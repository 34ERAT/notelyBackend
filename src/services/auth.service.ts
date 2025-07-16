import { User } from "@prisma/client";
import dbConnection from "../utils/dbConnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  const accessToken = jwt.sign({ id, userName }, config.jwtsecret, {
    expiresIn: "1h",
  });
  return { accessToken };
}
