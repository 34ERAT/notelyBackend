import { User } from "@prisma/client";
import dbConnection from "../utils/dbConnection";

export async function createUser(newUser: User) {
  const user = await dbConnection.user.create({ data: newUser });
  return user;
}
