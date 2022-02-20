import { atom } from "recoil"

export interface Coins {
  data: [
    {
      label: string
      value: string
    }
  ]
}

export const coinsState = atom({
  key: "coins",
  default: {
    data: [] as unknown as Coins,
  },
})
