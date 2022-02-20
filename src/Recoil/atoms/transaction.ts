import { atom } from "recoil"

export interface transactionDto {
  id: number
  botId: number
  botName: string
  symbol: string
  side: string
  type: string
  amount: number
  quantity: number
  price: number
  createdAt: Date
}

export const transactionState = atom({
  key: "transaction",
  default: {
    page: 1,
    size: 10,
    data: [] as transactionDto[]
  },
})
