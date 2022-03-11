import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Bade } from "../../Element/Dashboard.Element"
import { getTransactionDashboard } from "../../../Recoil/actions/transaction"
import { useRecoilState } from "recoil"
import { transactionsState } from "../../../Recoil/atoms"
import moment from "moment"

const TransactionLatest = React.memo(() => {
  console.log(6)

  const [transaction, setTransaction] = useRecoilState(transactionsState)

  React.useEffect(() => {
    function fetchData() {
      getTransactionDashboard(setTransaction)
        .then((result) => result)
        .catch((err) => err)
    }
    fetchData()
  }, [setTransaction])

  return (
    <TableContainer>
      <Table size="small" aria-label="sticky table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              No.
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Symbol
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Side
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Type
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Price
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Amount
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bolder" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction.data
            .filter((_, i) => i < 10)
            .map((item, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">
                  {item.symbol.toUpperCase()}
                </TableCell>
                <TableCell align="center" sx={{ width: 50 }}>
                  <Bade
                    style={{
                      background: item.side === "buy" ? "#007944" : "#D32626",
                    }}
                  >
                    {item.side.charAt(0).toUpperCase() + item.side.slice(1)}
                  </Bade>
                </TableCell>
                <TableCell align="center">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </TableCell>
                <TableCell align="right">
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="right">
                  {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="right">
                  {item.quantity
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="center">
                  {moment(item.createdAt).format("DD-MMM-YYYY HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default TransactionLatest
