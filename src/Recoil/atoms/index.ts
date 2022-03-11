import { loginState, registerState } from "./auth"
import { openSidebar } from "./style"
import { transactionPagingState, transactionsState } from "./transaction"
import { coinsState, orderValueUpdateState } from "./coins"
import { orderPagingState, orderDataState } from "./orders"

export {
  // auth
  loginState,
  registerState,
  // style
  openSidebar,
  // list
  coinsState,
  // transaction
  transactionPagingState,
  transactionsState,
  // order
  orderPagingState,
  orderDataState,
  orderValueUpdateState,
}
