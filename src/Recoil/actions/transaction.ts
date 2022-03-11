import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { transactionDto } from "../atoms/transaction"

export const getTransaction = async (
  transaction: {
    page: number
    size: number
  },
  setTransaction: SetterOrUpdater<{
    count: number
    data: transactionDto[]
  }>
) => {
  const result = await ajax
    .get(`/transaction/${transaction.page}/${transaction.size}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    let data = []
    for (const row of result.data) {
      data.push({
        ...row,
        quantity: parseFloat(row.quantity),
        price: parseFloat(row.price),
        amount: parseFloat(row.amount),
      })
    }
    setTransaction({ count: result.count, data })
  }
}

export const getTransactionDashboard = async (
  setTransaction: SetterOrUpdater<{
    count: number
    data: transactionDto[]
  }>
) => {
  const result = await ajax
    .get(`/transaction/0/10`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    let data = []
    for (const row of result.data) {
      data.push({
        ...row,
        quantity: parseFloat(row.quantity),
        price: parseFloat(row.price),
        amount: parseFloat(row.amount),
      })
    }
    setTransaction({ count: result.count, data })
  }
}
