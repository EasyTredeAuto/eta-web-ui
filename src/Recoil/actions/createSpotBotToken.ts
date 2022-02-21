import * as ajax from "../../Utils/ajax"
import { botValueReq } from "../atoms/coins"

export const createToken = async (value: botValueReq) => {
  return await ajax
    .post(`/bot-user`, value)
    .then((result) => result)
    .catch((err) => err)
}
