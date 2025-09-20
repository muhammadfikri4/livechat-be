export interface AddFriendDTO {
    code: string
}

export interface FriendDTOMapper {
    id: string
    name: string
    description: string | null
    image: string | null
    lastSeen: Date | null
}

export interface FriendCreationDTO {
    friendId: string
    userId: string
}