import { atom } from "recoil"

export interface botValueDto {
  name: string
  description: string
  exchange: string
}

export const botValueState = atom({
  key: "botValueState",
  default: {
    name: "",
    description: "",
    exchange: "binance"
  } as botValueDto,
})

export interface botValueUpdateDto {
  id: number | undefined
  name: string
  description: string
  exchange: string
}

export const botValueUpdateState = atom({
  key: "botValueUpdateState",
  default: {
    id: undefined,
    name: "",
    description: "",
    exchange: "",
  } as botValueUpdateDto,
})

export interface PagingDto {
  page: number
  size: number
  search: string
}

export const botPagingState = atom({
  key: "botPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
  } as PagingDto,
})

export interface botsDto {
  id: number
  name: string
  description: string
  exchange: string
  round: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const botDataState = atom({
  key: "botDataState",
  default: {
    count: 0,
    data: [] as botsDto[],
  },
})
