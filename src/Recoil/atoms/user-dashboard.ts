import { atom } from "recoil"

export interface DashboardCostDto {
  cost: number
  takeProfit: number
  netProfit: number
}

export const dashboardCostState = atom({
  key: "dashboardCostState",
  default: {
    cost: 0,
    takeProfit: 0,
    netProfit: 0,
  } as DashboardCostDto,
})

export interface AssetDto {
    name: string,
    allocation: number,
    value: number,
    price: number
}

export interface DashboardExchangeWidgetDto {
  exchange: string
  totalValue: number
  count: number
  assets: AssetDto[]
}

export const dashboardWidgetState = atom({
  key: "dashboardWidgetState",
  default: [] as DashboardExchangeWidgetDto[],
})