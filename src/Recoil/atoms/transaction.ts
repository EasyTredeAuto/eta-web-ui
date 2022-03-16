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

export const transactionPagingState = atom({
  key: "transactionPagingState",
  default: {
    page: 0,
    size: 10,
    from: new Date(),
    to: new Date(),
    exchange: "binance",
    symbol: null,
    side: null,
    type: null,
  },
})

export const transactionsState = atom({
  key: "transactionsState",
  default: {
    count: 0,
    data: [] as transactionDto[],
  },
})
