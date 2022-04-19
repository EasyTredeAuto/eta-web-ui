import { atom } from "recoil"

export interface botValueUserDto {
  symbol: string | undefined
  asset: string | undefined
  base: string | undefined
  active: boolean
  allSymbol: boolean
  amount: number | undefined
  amountType: string
  type: string | undefined
  timeFleam: string | undefined
  range: string | undefined
  indicatorIds: number | undefined
}

export const botValueUserState = atom({
  key: "botValueUserState",
  default: {
    symbol: undefined,
    asset: undefined,
    base: undefined,
    active: true,
    allSymbol: false,
    amount: undefined,
    amountType: "currency",
    type: 'limit',
    timeFleam: '1d',
    range: 'trend',
    indicatorIds: undefined,
  } as botValueUserDto,
})

export interface botValueUserUpdateDto {
  id: number | undefined
  symbol: string | undefined
  asset: string | undefined
  base: string | undefined
  active: boolean
  allSymbol: boolean
  amount: number | undefined
  amountType: string
  type: string | undefined
  timeFleam: string | undefined
  range: string | undefined
  indicatorIds: number | undefined
}

export const botValueUserUpdateState = atom({
  key: "botValueUserUpdateState",
  default: {
    id: undefined,
    symbol: undefined,
    asset: undefined,
    base: undefined,
    active: true,
    allSymbol: false,
    amount: undefined,
    amountType: "currency",
    type: 'limit',
    timeFleam: '1d',
    range: 'trend',
    indicatorIds: undefined,
  } as botValueUserUpdateDto,
})

export interface PagingDto {
  page: number
  size: number
  search: string
}

export const botUserPagingState = atom({
  key: "botUserPagingState",
  default: {
    page: 0,
    size: 10,
    search: "",
  } as PagingDto,
})

export interface botsUserViewDiaDto {
  name: string
  description: string
}

export const botUserViewState = atom({
  key: "botUserViewState",
  default: {
    name: "",
    description: "",
  } as botsUserViewDiaDto,
})

export interface botsUserDto {
  id: number
  symbol: string
  asset: string
  base: string
  name: string
  description: string
  amount: string
  amountType: string
  type: string
  indicatorIds: number
  round: number
  timeFleam: string
  range: string
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
  name: string
  description: string
}

export const botDataOptionState = atom({
  key: "botDataOptionState",
  default: [] as botsOptionDto[],
})
