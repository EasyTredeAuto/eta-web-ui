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

export interface botValueUpdateDto {
  id: number | undefined
  symbol: string | undefined
  name: string
  detail: string
  asset: string | undefined
  currency: string | undefined
}

export const botValueUpdateState = atom({
  key: "botValueUpdateState",
  default: {
    id: undefined,
    symbol: undefined,
    name: "",
    detail: "",
    asset: undefined,
    currency: undefined,
  } as botValueUpdateDto,
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
  asset: string
  currency: string
  name: string
  detail: string
  urlBuy: string
  urlSell: string
  round: number
  userAmount: number
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
