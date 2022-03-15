import { useEffect, memo } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { BoxContent } from "../../StyledComponent/History.Element"
import { useRecoilState } from "recoil"
import {
  transactionsState,
  transactionPagingState,
} from "../../../Recoil/atoms"
import moment from "moment"
import { getTransaction } from "../../../Recoil/actions/Transaction.action"
import { Bade } from "../../StyledComponent/Dashboard.Element"

const HistoryTable = memo(() => {
  console.log(7)

  const [paging, setPaging] = useRecoilState(transactionPagingState)
  const [transactions, setTransactions] = useRecoilState(transactionsState)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaging({ ...paging, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaging({
      ...paging,
      page: 0,
      size: parseInt(event.target.value),
    })
  }

  useEffect(() => {
    async function handleFetchData() {
      await getTransaction(paging, setTransactions)
    }
    handleFetchData()
  }, [paging, setTransactions])

  return (
    <BoxContent>
      <TableContainer sx={{ minHeight: 360, maxHeight: "calc(100vh - 240px)" }}>
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Side</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.symbol}</TableCell>
                <TableCell align="center" sx={{ width: 50 }}>
                  <Bade
                    style={{
                      background: row.side === "buy" ? "#007944" : "#D32626",
                    }}
                  >
                    {row.side.charAt(0).toUpperCase() + row.side.slice(1)}
                  </Bade>
                </TableCell>
                <TableCell align="center">
                  {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                </TableCell>
                <TableCell align="right">
                  {row.quantity
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="right">
                  {row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="right">
                  {row.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format("DD-MMM-YYYY HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.count}
        rowsPerPage={paging.size}
        page={paging.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </BoxContent>
  )
})

export default HistoryTable
