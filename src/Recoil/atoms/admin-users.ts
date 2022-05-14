import { atom } from "recoil"

export interface PagingDto {
  page: number
  size: number
  search: string
}

export const userPagingState = atom({
  key: "userPagingState",
  default: {
    page: 0,
    size: 10,
    search: ''
  } as PagingDto,
})

export interface userListValueDto {
  id: number
  email: string
  roles: string
  status: string
  apiActive: boolean
  createdAt: Date
  updatedAt: Date
}

export const userListDataState = atom({
  key: "userListDataState",
  default: {
    count: 0,
    data: [] as userListValueDto[],
  },
})