import "dotenv/config";
type Config = {
  port: number;
  jwtSecret: string;
  jwtSecretRefresh: string;
  origin: string;
  cloud_name: string;
  api_key: string;
  api_secret: string;
  gemini_api_key: string;
};
const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtSecretRefresh: process.env.JWT_REFRESH_SECRET as string,
  origin: process.env.ORIGIN as string,
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.COULDINARY_API_KEY as string,
  api_secret: process.env.COULDINARY_API_SECRET as string,
  gemini_api_key: process.env.GEMINI_API_KEY as string,
};
export default config;
