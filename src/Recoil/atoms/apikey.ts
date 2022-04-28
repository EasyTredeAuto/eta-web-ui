import { atom } from "recoil"

export interface apikeyDto {
  id: number | undefined
  exchange: string
  apiKey: string
  secretKey: string
  edit: boolean
}

export const apikeyState = atom({
  key: "apikeyState",
  default: {
    id: undefined,
    exchange: "binance",
    apiKey: "",
    secretKey: "",
    edit: false,
  } as apikeyDto,
})

export interface exchangeOptionDto {
  label: string
  value: string
}

export const exchangeState = atom({
  key: "exchangeState",
  default: [
    {
      label: "Binance",
      value: "binance",
    },
  ] as exchangeOptionDto[],
})

export interface PagingDto {
  page: number
  size: number
  search: string
}

export const accessPagingState = atom({
  key: "accessPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
  } as PagingDto,
})

export interface accessDto {
  id: number
  apiKey: string
  secretKey: string
  exchange: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const accessDataState = atom({
  key: "accessDataState",
  default: {
    count: 0,
    data: [] as accessDto[],
  },
})

export interface accessValueDto {
  apiKey: string
  secretKey: string
  exchange: string | undefined
}

export const accessValueState = atom({
  key: "accessValueState",
  default: {
    apiKey: "",
    secretKey: "",
    exchange: undefined,
  } as accessValueDto,
})

export interface accessValueUpdateDto {
  id: number | undefined
  apiKey: string
  secretKey: string
  exchange: string | undefined
}

export const accessValueUpdateState = atom({
  key: "accessValueUpdateState",
  default: {
    id: undefined,
    apiKey: "",
    secretKey: "",
    exchange: undefined,
  } as accessValueUpdateDto,
})
