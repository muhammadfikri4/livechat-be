import { User } from "@prisma/client";

export const getUserProfile = (data: User) => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        code: data.code,
    }
}