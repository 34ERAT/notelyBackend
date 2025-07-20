import "dotenv/config";
type Config = {
  port: number;
  jwtSecret: string;
  jwtSecretRefresh: string;
  origin: string;
};
const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtSecretRefresh: process.env.JWT_REFRESH_SECRET as string,
  origin: process.env.ORIGING as string,
};
export default config;
