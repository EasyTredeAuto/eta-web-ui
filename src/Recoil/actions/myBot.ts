import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { myBotsDto } from "../atoms/mybot"

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
    .get(`/bot-user/${myBots.page}/${myBots.size}`)
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

export const deleteMyBot = async (id: number, callBack: { (): Promise<void>; (): void }) => {
  const result = await ajax
    .remove(`/bot-user/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    callBack()
  }
}
