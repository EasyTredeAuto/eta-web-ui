import { atom } from "recoil"

export interface Coins {
  label: string
  value: string
}
export interface Assets {
  label: string
  value: string
}

export const coinsState = atom({
  key: "coinsState",
  default: {
    data: [] as Coins[],
  },
})

export const assetState = atom({
  key: "assetState",
  default: {
    data: [] as Assets[],
  },
})

export interface orderValueReq {
  name: string
  symbol: string | undefined
  asset: string | undefined
  currency: string | undefined
  side: string
  type: string
  amount: number | undefined
  amountType: string
}

export const orderValueState = atom({
  key: "orderValueState",
  default: {
    name: "",
    symbol: undefined,
    asset: undefined,
    currency: undefined,
    side: "buy",
    type: "limit",
    amount: undefined,
    amountType: "amount",
  } as orderValueReq,
})

export interface orderUpdateValueReq {
  id: number | undefined
  name: string
  symbol: string | undefined
  asset: string | undefined
  currency: string | undefined
  side: string
  type: string
  amount: number | undefined
  amountType: string
}

export const orderValueUpdateState = atom({
  key: "orderValueUpdateState",
  default: {
    id: undefined,
    name: "",
    symbol: undefined,
    asset: undefined,
    currency: undefined,
    side: "buy",
    type: "limit",
    amount: undefined,
    amountType: "amount",
  } as orderUpdateValueReq,
})