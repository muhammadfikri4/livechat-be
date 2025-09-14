import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../users/users.repository";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { generateRandom } from "../../utils/generate-random";
import { config } from "../../libs";

export const authService = {
  register: async (data: RegisterDTO) => {
    const hash = await bcrypt.hash(data.password, 10);
    const code = generateRandom(6)
    return userRepository.createUser({ ...data, password: hash, code});
  },

  login: async (data: LoginDTO) => {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return new ErrorApp( "Invalid credentials", 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: "7d" });
    return { token, user };
  },
};
