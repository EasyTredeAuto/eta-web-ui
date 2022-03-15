import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import {
  botValueUserDto,
  botsUserDto,
  botValueUserUpdateDto,
  botsOptionDto,
} from "../atoms/usedBot"

export const getListBots = async (
  paging: {
    page: number
    size: number
  },
  setBotList: SetterOrUpdater<{ count: number; data: botsUserDto[] }>
) => {
  const result = await ajax
    .get(`/use-bot-user/${paging.page}/${paging.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    setBotList({ count: result.count, data: result.data })
  }
}

export const getListBotsOption = async (setBotListOption: {
  (
    valOrUpdater:
      | botsOptionDto[]
      | ((currVal: botsOptionDto[]) => botsOptionDto[])
  ): void
  (arg0: any): void
}) => {
  const result = await ajax
    .get(`/manage-bot-admin/options`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result?.data) {
    setBotListOption(result.data)
  }
}

export const createBots = async (value: botValueUserDto) => {
  return await ajax
    .post(`/use-bot-user`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateBots = async (value: botValueUserUpdateDto) => {
  return await ajax
    .put(`/use-bot-user`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteBots = async (
  row: botsUserDto,
  callBack: { (): Promise<void>; (): void }
) => {
  const result = await ajax
    .remove(`/use-bot-user/${row.botIds}/${row.id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    callBack()
  }
}
