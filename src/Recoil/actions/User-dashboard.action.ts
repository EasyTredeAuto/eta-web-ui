import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import {
  DashboardCostDto,
  DashboardExchangeWidgetDto,
} from "../atoms/user-dashboard"

export const getDashboardCost = async (
  setCost: SetterOrUpdater<DashboardCostDto>
) => {
  const result = await ajax
    .get(`/dashboard/cost`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    const data = result.data as DashboardCostDto
    setCost({ ...data })
  }
}

export const getExchangeWidgets = async (
  setWidget: SetterOrUpdater<DashboardExchangeWidgetDto[]>
) => {
  const result = await ajax
    .get(`/dashboard/exchange/balance`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    const data = result.data as DashboardExchangeWidgetDto[]
    setWidget(data)
  }
}
