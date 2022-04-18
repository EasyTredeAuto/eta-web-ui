import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { botValueDto, botsDto, botValueUpdateDto } from "../atoms/bots"

export const getListBots = async (
  paging: {
    page: number
    size: number
    search: string
  },
  setBotList: SetterOrUpdater<{ count: number; data: botsDto[] }>
) => {
  const result = await ajax
    .get(`/indicator/${paging.page}/${paging.size}?search=${paging.search}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result?.data) {
    setBotList({ count: result.count, data: result.data })
  }
}

export const createBots = async (value: botValueDto) => {
  return await ajax
    .post(`/indicator`, value)
    .then((result) => result)
    .catch((err) => err)
}
export const updateActive = async (id: number, active: boolean) => {
  return await ajax
    .put(`/indicator/${id}`, { active })
    .then((result) => result)
    .catch((err) => err)
}

export const updateBots = async (value: botValueUpdateDto) => {
  return await ajax
    .put(`/indicator`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteBots = async (
  id: number,
  callBack: { (): Promise<void>; (): void }
) => {
  await ajax
    .remove(`/indicator/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  callBack()
}
