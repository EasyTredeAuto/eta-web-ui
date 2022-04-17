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

  if (result?.data) {
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
  if (result?.data) {
    let data = []
    for (const row of result.data) {
      data.push({
        ...row,
        quantity: parseFloat(row.allocation) * parseFloat(row.price),
        price: parseFloat(row.price),
        amount: parseFloat(row.allocation),
      })
    }
    setTransaction({ count: result.count, data })
  }
}

//

export const getAllTransactions = async (
  paging: {
    page: number
    size: number
    from: Date
    to: Date
    exchange: string | null
    symbol: string | null
    side: string | null
    type: string | null
  },
  setTransactions: SetterOrUpdater<{ count: number; data: transactionDto[] }>
) => {
  let query = ""
  if (paging.symbol) query = query + `&symbol=${paging.symbol}`
  if (paging.side) query = query + `&side=${paging.side}`
  if (paging.type) query = query + `&type=${paging.type}`
  if (paging.exchange) query = query + `&exchange=${paging.exchange}`
  const result = await ajax
    .get(
      `/transaction/${paging.page}/${paging.size}?from=${paging.from}&to=${paging.to}` +
        query
    )
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result.data) {
    setTransactions({ count: result.count, data: result.data })
  }
}
