import { atom } from "recoil"

export interface botValueUserDto {
  amount: number | undefined
  amountType: string
  type: string | undefined
  botId: number | undefined
}

export const botValueUserState = atom({
  key: "botValueUserState",
  default: {
    amount: undefined,
    amountType: "amount",
    type: undefined,
    botId: undefined,
  } as botValueUserDto,
})

export interface botValueUserUpdateDto {
  id: number | undefined
  amount: number | undefined
  amountType: string
  type: string
  botId: number | undefined
}

export const botValueUserUpdateState = atom({
  key: "botValueUserUpdateState",
  default: {
    id: undefined,
    amount: undefined,
    amountType: "",
    type: "",
    botId: undefined,
  } as botValueUserUpdateDto,
})

export interface PagingDto {
  page: number
  size: number
  search: string
}

export const botUserPagingState = atom({
  key: "botPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
  } as PagingDto,
})

export interface botsUserViewDiaDto {
  name: string
  detail: string
}

export const botUserViewState = atom({
  key: "botUserViewState",
  default: {
    name: "",
    detail: "",
  } as botsUserViewDiaDto,
})

export interface botsUserDto {
  id: number
  symbol: string
  asset: string
  currency: string
  name: string
  detail: string
  amount: string
  amountType: string
  type: string
  botIds: number
  round: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const botUserDataState = atom({
  key: "botUserDataState",
  default: {
    count: 0,
    data: [] as botsUserDto[],
  },
})

export interface botsOptionDto {
  id: number
  symbol: string
  asset: string
  currency: string
  name: string
  detail: string
}

export const botDataOptionState = atom({
  key: "botDataOptionState",
  default: [] as botsOptionDto[],
})
