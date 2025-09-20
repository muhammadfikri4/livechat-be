import { FriendDTOMapper } from "./friends.dto";
import { FriendData } from "./friends.interface";


export const getFriendsDTOMapper = (data: FriendData[]): FriendDTOMapper[] => {
    return data.map((friend) => ({
        id: friend.friend.id,
        name: friend.friend.name,
        image: null,
        description: friend.friend.description,
        lastSeen: friend.friend.lastSeen,
        isOnline: friend.friend.isOnline
    }))
}