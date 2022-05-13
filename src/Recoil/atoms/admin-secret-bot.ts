import { atom } from "recoil"

export interface scheduleListValueDto {
  id: number
  email: string
  roles: string
  status: string
  apiActive: boolean
  createdAt: Date
  updatedAt: Date
}

export const scheduleListDataState = atom({
  key: "scheduleListDataState",
  default: [] as scheduleListValueDto[],
})

export interface scheduleOptionDto {
  label: string
  value: number
}

export const scheduleOptionDataState = atom({
  key: "scheduleOptionDataState",
  default: [] as scheduleOptionDto[],
})

export interface PagingDto {
  page: number
  size: number
  search: string
  userIds: number | null
}

export const botScheduledAccessPagingState = atom({
  key: "botScheduledAccessPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
    userIds: null,
  } as PagingDto,
})

export interface accessBotDto {
  id: number
  apiKey: string
  secretKey: string
  exchange: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const accessBotDataState = atom({
  key: "accessDataState",
  default: {
    count: 0,
    data: [] as accessBotDto[],
  },
})
