import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { botValueDto, botsDto } from "../atoms/bots"

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

// export const updateToken = async (value: orderUpdateValueReq) => {
//   return await ajax
//     .put(`/manage-orders`, value)
//     .then((result) => result)
//     .catch((err) => err)
// }

// export const deleteOrder = async (
//   id: number,
//   callBack: { (): Promise<void>; (): void }
// ) => {
//   const result = await ajax
//     .remove(`/manage-orders/${id}`)
//     .then((result) => result)
//     .catch((err) => console.log(err))

//   if (result?.data) {
//     callBack()
//   }
// }
