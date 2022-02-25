import * as ajax from "../../Utils/ajax"
import { botUpdateValueReq, botValueReq } from "../atoms/coins"

export const createToken = async (value: botValueReq) => {
  return await ajax
    .post(`/bot-user`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateToken = async (value: botUpdateValueReq) => {
  return await ajax
    .put(`/bot-user`, value)
    .then((result) => result)
    .catch((err) => err)
}
