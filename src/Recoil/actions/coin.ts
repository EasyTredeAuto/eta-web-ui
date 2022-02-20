import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { Coins } from "../atoms/coins"
import { transactionDto } from "../atoms/transaction"

export const getCoinList = async (
  setCoins: SetterOrUpdater<{ data: Coins }>
) => {
  const result = await ajax
    .get(`/binance-coin/coins/price`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result) {
    let data: any = [] as unknown as Coins
    for (const coin of result) {
      data.push({ label: coin.symbol, value: coin.symbol })
    }
    setCoins({ data: data })
  }
}
