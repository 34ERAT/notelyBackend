import "dotenv/config";
type Config = {
  port: number;
  jwtsecret: string;
};
const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtsecret: process.env.JWT_SECRET as string,
};
export default config;
