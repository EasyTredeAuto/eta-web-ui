import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { botValueDto, botsDto, botValueUpdateDto } from "../atoms/bots"

export const getListBots = async (
  paging: {
    page: number
    size: number
  },
  setBotList: SetterOrUpdater<{ count: number; data: botsDto[] }>
) => {
  const result = await ajax
    .get(`/manage-bot-admin/${paging.page}/${paging.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    setBotList({ count: result.count, data: result.data })
  }
}

export const createBots = async (value: botValueDto) => {
  return await ajax
    .post(`/manage-bot-admin`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateBots = async (value: botValueUpdateDto) => {
  return await ajax
    .put(`/manage-bot-admin`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteBots = async (
  id: number,
  callBack: { (): Promise<void>; (): void }
) => {
  const result = await ajax
    .remove(`/manage-bot-admin/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    callBack()
  }
}
