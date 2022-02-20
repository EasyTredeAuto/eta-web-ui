import { useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { BoxContent } from "../../Element/History.Element"
import { useRecoilState } from "recoil"
import { transactionState } from "../../../Recoil/atoms"
import moment from "moment"
import { getTransaction } from "../../../Recoil/actions/transaction"

export default function HistoryTable() {
  const [transaction, setTransaction] = useRecoilState(transactionState)

  const handleChangePage = (event: unknown, newPage: number) => {
    setTransaction({ ...transaction, page: newPage })
  }

  const handleFetchData = async () => {
    await getTransaction(transaction, setTransaction)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransaction({
      ...transaction,
      page: 0,
      size: parseInt(event.target.value),
    })
  }

  useEffect(() => {
    handleFetchData()
  }, [transaction.size])

  useEffect(() => {
    handleFetchData()
  }, [transaction.page])

  return (
    <BoxContent>
      <TableContainer>
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
            {transaction.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.symbol}</TableCell>
                <TableCell align="center">{row.side}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
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
        count={transaction.count}
        rowsPerPage={transaction.size}
        page={transaction.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </BoxContent>
  )
}
