import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { ordersDto } from "../atoms/todo-orders"
import { orderUpdateValueReq, orderValueReq } from "../atoms/user-symbol"

export const getListOrders = async (
  paging: {
    page: number
    size: number
  },
  setOrderList: SetterOrUpdater<{ count: number; data: ordersDto[] }>
) => {
  const result = await ajax
    .get(`/manage-orders/${paging.page}/${paging.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    let data = []
    for (const row of result.data) {
      data.push({
        ...row,
        amount: parseFloat(row.amount),
      })
    }
    setOrderList({ count: result.count, data })
  }
}

export const createToken = async (value: orderValueReq) => {
  return await ajax
    .post(`/manage-orders`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const updateToken = async (value: orderUpdateValueReq) => {
  return await ajax
    .put(`/manage-orders`, value)
    .then((result) => result)
    .catch((err) => err)
}

export const deleteOrder = async (
  id: number,
  callBack: { (): Promise<void>; (): void }
) => {
  const result = await ajax
    .remove(`/manage-orders/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    callBack()
  }
}
