import { atom } from "recoil"

export interface botValueDto {
  symbol: string | undefined
  name: string
  detail: string
  asset: string | undefined
  currency: string | undefined
}

export const botValueState = atom({
  key: "botValueState",
  default: {
    symbol: undefined,
    name: "",
    asset: undefined,
    currency: undefined,
    detail: "",
  } as botValueDto,
})

export const botPagingState = atom({
  key: "botPagingState",
  default: {
    page: 0,
    size: 10,
  },
})

export interface botsDto {
  id: number
  symbol: string
  name: string
  detail: string
  urlBuy: string
  urlSell: string
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
