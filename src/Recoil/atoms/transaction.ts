import { atom } from "recoil"

export interface transactionDto {
  id: number
  amount: number
  price: number
  quantity: number
  side: string
  symbol: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export const transactionState = atom({
  key: "transaction",
  default: {
    page: 0,
    size: 10,
    count: 0,
    data: [] as transactionDto[],
  },
})
