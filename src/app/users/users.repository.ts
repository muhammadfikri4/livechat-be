import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../auth/auth.dto";
const prisma = new PrismaClient();

export const userRepository = {
  getUserByEmail: async(email: string) => prisma.user.findUnique({ where: { email } }),
  getUserById: async(id: string) => prisma.user.findUnique({ where: { id } }),
  createUser: async(data: RegisterDTO) =>
    prisma.user.create({ data }),
  updateUser: async(userId: string, data: Partial<RegisterDTO>) =>
    prisma.user.update({ where: { id: userId }, data }),
  getUserByCode: async(code: string) =>
    prisma.user.findUnique({ where: {
      code
    }}),
};
