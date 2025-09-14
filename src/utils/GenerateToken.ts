import Jwt from "jsonwebtoken";
import { config } from "../libs";

export const GenerateToken = (userId: string) => {
  return Jwt.sign(
    {
      userId,
    },
    config.JWT_SECRET as string,
    {
      expiresIn: config.JWT_EXPIRES,
    }
  );
};
