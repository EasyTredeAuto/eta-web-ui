import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { Assets, Coins } from "../atoms/coins"

export const getSymbol = async (setCoins: SetterOrUpdater<{ data: Coins[] }>) => {
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

export const getAsset = async (setAsset: SetterOrUpdater<{ data: Assets[] }>) => {
  const result = await ajax
    .get(`/binance-coin/coins/asset`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result) {
    setAsset({ data: result })
  }
}
