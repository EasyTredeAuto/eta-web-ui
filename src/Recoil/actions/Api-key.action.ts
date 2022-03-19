import * as ajax from "../../Utils/ajax"
import { apikeyDto } from "../atoms/apikey"

export const getApiKey = async (
  settingApi: {
    (valOrUpdater: apikeyDto | ((currVal: apikeyDto) => apikeyDto)): void
    (arg0: any): void
  },
  exchange: string
) => {
  const result = await ajax
    .get(`/setting-api/exchange/${exchange}`)
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result.data) {
    settingApi({ exchange, ...result.data })
  } else settingApi({ exchange, id: undefined, apiKey: "", secretKey: "" })
}

export const CreateOrUpdateApiKey = async (api: any) => {
  return await ajax
    .post(`/setting-api`, api)
    .then((result) => result)
    .catch((err) => console.log(err))
}

export const isCheckUserApi = async () => {
  return await ajax
    .get(`/setting-api/check`)
    .then((result) => result)
    .catch((err) => err)
}
