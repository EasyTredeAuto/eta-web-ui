import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { indicatorDto, indicatorsDto, indicatorUpdateDto } from "../atoms/admin-indicator"

export const getAllIndicators = async (
  paging: {
    page: number
    size: number
    search: string
  },
  setBotList: SetterOrUpdater<{ count: number; data: indicatorsDto[] }>
) => {
  const result = await ajax
    .get(`/indicator/${paging.page}/${paging.size}?search=${paging.search}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result?.data) {
    setBotList({ count: result.count, data: result.data })
  }
}

export const createIndicator = async (value: indicatorDto) => {
  return await ajax
    .post(`/indicator`, value)
    .then((result) => result)
    .catch((err) => err)
}
export const activeIndicator = async (id: number, active: boolean) => {
  return await ajax
    .put(`/indicator/${id}`, { active })
    .then((result) => result)
    .catch((err) => err)
}

export const updateIndicator = async (value: indicatorUpdateDto) => {
  return await ajax
    .put(`/indicator`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteIndicators = async (
  id: number,
  callBack: { (): Promise<void>; (): void }
) => {
  await ajax
    .remove(`/indicator/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  callBack()
}
