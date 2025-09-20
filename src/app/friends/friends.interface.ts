import { Friend, User } from "@prisma/client";
import { Query } from "../../interface/Query";

export interface FriendData extends Friend {
    friend: User
}

export interface FriendQueryParams extends Query{}