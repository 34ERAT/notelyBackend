import { User } from "@prisma/client";
import dbConnection from "../utils/dbConnection";

export async function updateProfile(profile: User) {
  const { id, ...rest } = profile;
  const patchedProfile = await dbConnection.user.update({
    where: {
      id,
    },
    data: rest,
  });
  return patchedProfile;
}
