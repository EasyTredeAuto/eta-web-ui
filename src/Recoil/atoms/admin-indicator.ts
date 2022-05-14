import { atom } from "recoil"

//! create indicator
export interface indicatorDto {
  name: string
  description: string
  exchange: string
}
export const indicatorState = atom({
  key: "indicatorState",
  default: {
    name: "",
    description: "",
    exchange: "binance",
  } as indicatorDto,
})

//! update indicator
export interface indicatorUpdateDto {
  id: number | undefined
  name: string
  description: string
  exchange: string
}
export const indicatorUpdateState = atom({
  key: "indicatorUpdateState",
  default: {
    id: undefined,
    name: "",
    description: "",
    exchange: "",
  } as indicatorUpdateDto,
})

//! paging indicators
export interface PagingDto {
  page: number
  size: number
  search: string
}
export const indicatorsPagingState = atom({
  key: "indicatorsPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
  } as PagingDto,
})

// indicators
export interface indicatorsDto {
  id: number
  name: string
  description: string
  exchange: string
  round: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}
export const indicatorsState = atom({
  key: "indicatorsState",
  default: {
    count: 0,
    data: [] as indicatorsDto[],
  },
})
