import * as React from "react"
import Swal from "sweetalert2"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { deleteMyBot, getAllMyBots } from "../../../Recoil/actions/manageOrders"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  orderValueUpdateState,
  orderPagingState,
  orderDataState,
} from "../../../Recoil/atoms"
import useCopyToClipboard from "../../../Middleware/copyToClipboard"
import { orderUpdateValueReq } from "../../../Recoil/atoms/coins"
import { MdContentCopy, MdDelete } from "react-icons/md"
import UpdateBot from "../../Dialog/UpdateOrder.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"

const Overview = React.memo(() => {
  const copy = useCopyToClipboard()[1]
  const [open, setOpen] = React.useState(false)
  const [paging, setPaging] = useRecoilState(orderPagingState)
  const [orderList, setOrderList] = useRecoilState(orderDataState)
  const setValue = useSetRecoilState(orderValueUpdateState)

  const handleUpdate = (bot: any) => {
    const data = {
      id: bot.id,
      name: bot.name,
      symbol: bot.symbol,
      asset: bot.asset,
      currency: bot.currency,
      side: bot.side,
      type: bot.type,
      amount: bot.amount,
      amountType: bot.amountType,
    } as orderUpdateValueReq
    setValue(data)
    setOpen(true)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaging({ ...paging, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaging({ ...paging, size: parseInt(event.target.value, 10), page: 0 })
  }

  const handleChangeFetchingOrders = async () => {
    getAllMyBots(paging, setOrderList)
  }
  const handleChangeDelete = async (id: number, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteMyBot(id, handleChangeFetchingOrders),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      getAllMyBots(paging, setOrderList)
    }
    fetchData()
  }, [paging, setOrderList])

  return (
    <>
      <TableContainer sx={{ minHeight: 420, maxHeight: "calc(100vh - 240px)" }}>
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Side/Type</TableCell>
              <TableCell align="center">Round</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">
                  {row.symbol.toLocaleUpperCase()}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">
                  {row.amountType === "amount" ? "Token" : "Percent"}
                </TableCell>
                <TableCell align="center">{`${
                  row.side.charAt(0).toUpperCase() + row.side.slice(1)
                }/${
                  row.type.charAt(0).toUpperCase() + row.type.slice(1)
                }`}</TableCell>
                <TableCell align="center">{row.round}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy url" placement="top">
                    <IconButton onClick={() => copy(row.url)}>
                      <MdContentCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleUpdate(row)}>
                      <FaEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <IconButton
                      onClick={() => handleChangeDelete(row.id, row.name)}
                    >
                      <MdDelete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orderList.count}
        rowsPerPage={paging.size}
        page={paging.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateBot open={open} setOpen={setOpen} />
    </>
  )
})

export default Overview
