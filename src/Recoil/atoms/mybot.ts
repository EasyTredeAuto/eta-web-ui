import { atom } from "recoil"

export interface myBotsDto {
  id: number
  name: string
  symbol: string
  amount: number
  amountType: string
  side: string
  type: string
  url: string
  round: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const myBotsState = atom({
  key: "myBots",
  default: {
    page: 0,
    size: 10,
    count: 0,
    data: [] as myBotsDto[],
  },
})
