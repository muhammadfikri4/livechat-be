import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 3001),
  JWT_SECRET: JSON.stringify(process.env.JWT_SECRET ?? ''),
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  CODE: process.env.CODE,
  SMTP_USER: process.env.SMTP_USER,
  ABLY_API_KEY: process.env.ABLY_API_KEY ?? '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_LOGIN: process.env.SMTP_LOGIN,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  FIREBASE: {
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ?? "",
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ?? "",
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? "",
  },
  REDIS: {
    PASSWORD: process.env.REDIS_PASSWORD,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  },
};
