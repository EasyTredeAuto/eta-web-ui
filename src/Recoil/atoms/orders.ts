import { atom } from "recoil"

export interface ordersDto {
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

export const orderPagingState = atom({
  key: "orderPagingState",
  default: {
    page: 0,
    size: 10,
  },
})

export const orderDataState = atom({
  key: "orderDataState",
  default: {
    count: 0,
    data: [] as ordersDto[],
  },
})
