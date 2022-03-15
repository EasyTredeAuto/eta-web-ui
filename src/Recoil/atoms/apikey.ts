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
    {
      label: "kk",
      value: "kk",
    },
  ] as exchangeOptionDto[],
})
