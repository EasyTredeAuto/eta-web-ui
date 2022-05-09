import moment from "moment"
import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { transactionDto } from "../atoms/transaction"

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

  const from = moment().startOf("day").format()
  const to = moment().endOf("day").format()

  const result = await ajax
    .get(
      `/transaction/query/${paging.page}/${paging.size}?from=${from}&to=${to}` +
        query
    )
    .then((result) => result)
    .catch((err) => console.log(err))
  if (result.data) {
    const data = []
    for (const x of result.data) {
      const price = parseFloat(x.price)
      const amount = parseFloat(x.allocation)
      const quantity = amount * price
      data.push({ ...x, quantity, price, amount })
    }
    setTransactions({ count: result.count, data })
  }
}
