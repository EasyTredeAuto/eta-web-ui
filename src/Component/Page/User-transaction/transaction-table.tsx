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
import { getAllTransactions } from "../../../Recoil/actions/User-transaction.action"
import { Bade } from "../../StyledComponent/Dashboard.Element"
import { isMobileOnly } from "mobile-device-detect"

const HistoryTable = memo(() => {
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
      await getAllTransactions(paging, setTransactions)
    }
    handleFetchData()
  }, [paging, setTransactions])

  return (
    <BoxContent>
      <TableContainer
        sx={{
          minHeight: isMobileOnly ? "45vh" : "calc(100vh - 340px)",
          maxHeight: isMobileOnly
            ? "calc(100vh - 350px)"
            : "calc(100vh - 340px)",
        }}
      >
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Side</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" style={{ minWidth: 200 }}>
                  {(row.name||'').toUpperCase()}
                </TableCell>
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
                  {row.amount.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.price.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.quantity.toLocaleString()}
                </TableCell>
                <TableCell align="center" style={{ minWidth: 200 }}>
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
