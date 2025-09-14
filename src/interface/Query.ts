import { Status } from "@prisma/client"

export interface Query {
    page?: string
    perPage?: string
    search?: string
    status?: Status
    sortBy?: string
    year?: string
}