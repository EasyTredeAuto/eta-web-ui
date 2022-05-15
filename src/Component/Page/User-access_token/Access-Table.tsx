import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Switch from "@mui/material/Switch"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  accessPagingState,
  accessDataState,
  accessValueUpdateState
} from "../../../Recoil/atoms"
import { MdDelete } from "react-icons/md"
import UpdateSecret from "./Update-sercret.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import Swal from "sweetalert2"
import moment from "moment"
import { isMobileOnly } from "mobile-device-detect"
import { accessDto, accessValueUpdateDto } from "../../../Recoil/atoms/user-access"
import {
  deleteAccess,
  getAllApiKey,
  updateActive,
} from "../../../Recoil/actions/User-access.action"

const ListAccessTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [paging, setPaging] = useRecoilState(accessPagingState)
  const [accessList, setData] = useRecoilState(accessDataState)
  const setValue = useSetRecoilState(accessValueUpdateState)

  const handleUpdate = (Api: accessDto) => {
    const data = {
      id: Api.id,
      exchange: Api.exchange,
      apiKey: Api.apiKey,
      secretKey: Api.secretKey,
    } as accessValueUpdateDto
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
    getAllApiKey(paging, setData)
  }

  const handleActiveBot = async (row: any) => {
    setLoading(true)
    await updateActive(row.id, !row.active)
    handleChangeFetchingOrders()
    setLoading(false)
  }

  const handleChangeDelete = async (row: accessDto) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${row.exchange} on key ?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteAccess(row, handleChangeFetchingOrders),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      getAllApiKey(paging, setData)
    }
    fetchData()
  }, [paging, setData])

  const label = { inputProps: { "aria-label": "Switch demo" } }
  const xsStyle = {
    minHeight: isMobileOnly ? "calc(100vh - 310px)" : "calc(100vh - 240px)",
    maxHeight: isMobileOnly ? "calc(100vh - 150px)" : "calc(100vh - 340px)",
  }

  return (
    <>
      <TableContainer sx={xsStyle}>
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Exchange</TableCell>
              <TableCell align="center">Api key</TableCell>
              <TableCell align="center">Secret key</TableCell>
              <TableCell align="center">Create Date</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessList.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  {(row.exchange || "").toUpperCase()}
                </TableCell>
                <TableCell align="center">
                  {row.apiKey ? row.apiKey.substr(0, 20) + "..." : ""}
                </TableCell>
                <TableCell align="center">
                  {row.secretKey ? "*".repeat(20) : ""}
                </TableCell>
                <TableCell align="center" style={{ minWidth: 200 }}>
                  {moment(row.createdAt).format("DD MMM YYYY HH:mm")}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    {...label}
                    checked={row.active}
                    disabled={loading}
                    onChange={() => handleActiveBot(row)}
                  />
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleUpdate(row)}>
                      <FaEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <IconButton onClick={() => handleChangeDelete(row)}>
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
        count={accessList.count}
        rowsPerPage={paging.size}
        page={paging.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateSecret open={open} setOpen={setOpen} />
    </>
  )
})

export default ListAccessTable
