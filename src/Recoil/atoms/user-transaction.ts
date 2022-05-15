import { atom } from "recoil"

export interface transactionDto {
  id: number
  name: string
  amount: number
  price: number
  quantity: number
  side: string
  symbol: string
  type: string
  exchange: string
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
    exchange: null,
    symbol: null,
    indicatorIds: null,
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
