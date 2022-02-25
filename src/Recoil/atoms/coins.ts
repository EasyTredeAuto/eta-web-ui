import { atom } from "recoil"

export interface Coins {
  data: [
    {
      label: string
      value: string
    }
  ]
}
export interface Assets {
  find: any
  data: [string]
}

export const coinsState = atom({
  key: "coins",
  default: {
    data: [] as unknown as Coins,
  },
})

export const assetState = atom({
  key: "asset",
  default: {
    data: [] as unknown as Assets,
  },
})

export interface botValueReq {
  name: string
  symbol: string | undefined
  asset: string | undefined
  currency: string | undefined
  side: string
  type: string
  amount: number | undefined
  amountType: string
}

export const botValueState = atom({
  key: "botValue",
  default: {
    name: '',
    symbol: undefined,
    asset: undefined,
    currency: undefined,
    side: "buy",
    type: "limit",
    amount: undefined,
    amountType: "amount",
  } as botValueReq,
})

export interface botUpdateValueReq {
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

export const botValueUpdateState = atom({
  key: "botUpdateValue",
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
  } as botUpdateValueReq,
})
