import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { BinanceAsset } from "../atoms/user-symbol"
import {
  botValueUserDto,
  botsUserDto,
  botValueUserUpdateDto,
  botsOptionDto,
} from "../atoms/user-bot"

export const getListBots = async (
  paging: {
    page: number
    size: number
    search: string
  },
  setBotList: SetterOrUpdater<{ count: number; data: botsUserDto[] }>
) => {
  const result = await ajax
    .get(
      `/indicator-user-mapping/${paging.page}/${paging.size}?search=${paging.search}`
    )
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
    .get(`/indicator-user-mapping/options`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result?.data) {
    setBotListOption(result.data)
  }
}

export const getBinanceAsset = async (
  setBinanceAsset: SetterOrUpdater<{ data: BinanceAsset[] }>
) => {
  const result = await ajax
    .get("/indicator-user-mapping/asset")
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    let data = [] as BinanceAsset[]
    data = result?.data.map((x: string) => {
      return { label: x, value: x }
    })
    setBinanceAsset({ data })
  }
}

export const createBots = async (value: botValueUserDto) => {
  return await ajax
    .post(`/indicator-user-mapping`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateBots = async (value: botValueUserUpdateDto) => {
  return await ajax
    .put(`/indicator-user-mapping`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateActive = async (id: number, active: boolean) => {
  return await ajax
    .put(`/indicator-user-mapping/${id}`, { active })
    .then((result) => result)
    .catch((err) => err)
}

export const deleteBots = async (
  row: botsUserDto,
  callBack: { (): Promise<void>; (): void }
) => {
  await ajax
    .remove(`/indicator-user-mapping/${row.id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  callBack()
}
