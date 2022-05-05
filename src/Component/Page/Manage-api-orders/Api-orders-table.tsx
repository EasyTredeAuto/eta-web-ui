import * as React from "react"
import Swal from "sweetalert2"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import {
  deleteOrder,
  getListOrders,
} from "../../../Recoil/actions/Manage-orders.action"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  orderValueUpdateState,
  orderPagingState,
  orderDataState,
} from "../../../Recoil/atoms"
import { orderUpdateValueReq } from "../../../Recoil/atoms/coins"
import { MdContentCopy, MdDelete } from "react-icons/md"
import UpdateBot from "./Update-api-order.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import { isMobileOnly } from "mobile-device-detect"

const Overview = React.memo(() => {

  const [open, setOpen] = React.useState(false)
  const [paging, setPaging] = useRecoilState(orderPagingState)
  const [orderList, setOrderList] = useRecoilState(orderDataState)
  const setValue = useSetRecoilState(orderValueUpdateState)

  const handleUpdate = (Api: any) => {
    const data = {
      id: Api.id,
      name: Api.name,
      symbol: Api.symbol,
      asset: Api.asset,
      currency: Api.currency,
      side: Api.side,
      type: Api.type,
      amount: Api.amount,
      amountType: Api.amountType,
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
    getListOrders(paging, setOrderList)
  }
  const handleChangeDelete = async (id: number, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteOrder(id, handleChangeFetchingOrders),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      getListOrders(paging, setOrderList)
    }
    fetchData()
  }, [paging, setOrderList])

  return (
    <>
      <TableContainer
        // sx={{
        //   minHeight: isMobileOnly ? "60vh" : 460,
        //   maxHeight: isMobileOnly
        //     ? "calc(100vh - 330px)"
        //     : "calc(100vh - 250px)",
        // }}
      >
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
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(row.url)
                      }}
                    >
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
