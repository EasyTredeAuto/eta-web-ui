import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { myBotsDto } from "../atoms/mybot"
import { botUpdateValueReq, botValueReq } from "../atoms/coins"

export const getAllMyBots = async (
  myBots: {
    page: number
    size: number
    count: number
    data: myBotsDto[]
  },
  setMyBots: SetterOrUpdater<{
    page: number
    size: number
    count: number
    data: myBotsDto[]
  }>
) => {
  const result = await ajax
    .get(`/manage-orders/${myBots.page}/${myBots.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    let data = []
    for (const row of result.data) {
      data.push({
        ...row,
        amount: parseFloat(row.amount),
      })
    }
    setMyBots({ ...myBots, count: result.count, data })
  }
}

export const createToken = async (value: botValueReq) => {
  return await ajax
    .post(`/manage-orders`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateToken = async (value: botUpdateValueReq) => {
  return await ajax
    .put(`/manage-orders`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteMyBot = async (id: number, callBack: { (): Promise<void>; (): void }) => {
  const result = await ajax
    .remove(`/manage-orders/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    callBack()
  }
}
