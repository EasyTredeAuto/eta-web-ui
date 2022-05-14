import * as ajax from "../../Utils/ajax"
import { accessDto, accessValueDto, accessValueUpdateDto, apikeyDto, PagingDto } from "../atoms/user-access"
import { SetterOrUpdater } from "recoil"

export const getApiKey = async (
  settingApi: {
    (valOrUpdater: apikeyDto | ((currVal: apikeyDto) => apikeyDto)): void
    (arg0: any): void
  },
  exchange: string
) => {
  const result = await ajax
    .get(`/secret-api/exchange/${exchange}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result.data) {
    settingApi({ exchange, ...result.data })
  } else settingApi({ exchange, id: undefined, apiKey: "", secretKey: "" })
}

export const CreateOrUpdateApiKey = async (api: any) => {
  return await ajax
    .post(`/secret-api`, api)
    .then((result) => result)
    .catch((err) => console.log(err))
}

export const isCheckUserApi = async () => {
  const result = await ajax
    .get(`/secret-api/check`)
    .then((result) => result)
    .catch((err) => err)
  return result
}

//---------------------------->

export const getAllApiKey = async (
  pegging: PagingDto,
  setData: SetterOrUpdater<{ count: number; data: accessDto[] }>
) => {
  const result = await ajax
    .get(`/secret-api/${pegging.page}/${pegging.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    setData({ data: result.data, count: result.count })
  } else setData({ data: [], count: 0 })
}

export const deleteAccess = async (
  row: accessDto,
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

export const createAccess = async (value: accessValueDto) => {
  return await ajax
    .post(`/secret-api`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateAccess = async (value: accessValueUpdateDto) => {
  return await ajax
    .put(`/secret-api`, value)
    .then((result) => result)
    .catch((err) => err)
}