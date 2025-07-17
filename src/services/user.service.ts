import { User } from "@prisma/client";
import dbConnection from "../utils/dbConnection";

export async function updateProfile(profile: User) {
  const { id, ...rest } = profile;
  const patchedProfile = await dbConnection.user.update({
    where: {
      id,
    },
    data: rest,
    omit: { password: true, id: true, isDeleted: true },
  });
  return patchedProfile;
}
export async function getProfile(userId: string) {
  return await dbConnection.user.findUnique({
    where: { id: userId },
    omit: { password: true, isDeleted: true, id: true },
  });
}
