import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import {
  accessBotDto,
  accessBotValueDto,
  PagingDto,
  scheduleListValueDto,
} from "../atoms/admin-schedule-access"
import { accessValueUpdateDto } from "../atoms/user-access"

export const getAllSchedule = async (
  setUserBot: SetterOrUpdater<scheduleListValueDto[]>
) => {
  const result = await ajax
    .get(`/secret-api/bot`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    setUserBot(result.data)
  }
}

export const getAllApiKey = async (
  pegging: PagingDto,
  setData: SetterOrUpdater<{ count: number; data: accessBotDto[] }>
) => {
  const result = await ajax
    .get(
      `/secret-api/${pegging.page}/${pegging.size}/${pegging.userIds}?search=${pegging.search}`
    )
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    setData({ data: result.data, count: result.count })
  } else setData({ data: [], count: 0 })
}

export const deleteAccess = async (
  row: accessBotDto,
  callBack: { (): Promise<void>; (): void }
) => {
  await ajax
    .remove(`/secret-api/${row.id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  callBack()
}

export const updateActive = async (id: number, active: boolean) => {
  return await ajax
    .put(`/secret-api/${id}`, { active })
    .then((result) => result)
    .catch((err) => err)
}

export const createAccess = async (value: accessBotValueDto) => {
  return await ajax
    .post(`/secret-api/${value.userIds}`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateAccess = async (value: accessValueUpdateDto) => {
  return await ajax
    .put(`/secret-api`, value)
    .then((result) => result)
    .catch((err) => err)
}
