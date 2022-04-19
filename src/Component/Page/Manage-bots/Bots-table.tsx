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
  botDataState,
  botPagingState,
  botValueUpdateState,
} from "../../../Recoil/atoms"
import { botsDto, botValueUpdateDto } from "../../../Recoil/atoms/bots"
import { MdDelete } from "react-icons/md"
import ViewBot from "./Detail-bot.dialog"
import UpdateBot from "./Update-bot.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import {
  deleteBots,
  getListBots,
  updateActive,
} from "../../../Recoil/actions/Indicator.action"
import Swal from "sweetalert2"
import moment from "moment"
import { TextName } from "../../StyledComponent/Fontsize.element"
import { isMobileOnly } from "mobile-device-detect"

const ListBotsTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [openView, setOpenDiaView] = React.useState(false)
  const [paging, setPaging] = useRecoilState(botPagingState)
  const [botList, setBotList] = useRecoilState(botDataState)
  const setValue = useSetRecoilState(botValueUpdateState)
  const handleUpdate = (Api: any) => {
    const data = {
      id: Api.id,
      name: Api.name,
      description: Api.description,
      exchange: Api.exchange,
    } as botValueUpdateDto
    setValue(data)
    setOpen(true)
  }
  const handleView = (Api: any) => {
    const data = {
      id: Api.id,
      name: Api.name,
      description: Api.description,
    } as botValueUpdateDto
    setValue(data)
    setOpenDiaView(true)
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
    getListBots(paging, setBotList)
  }
  const handleActiveBot = async (row: any) => {
    setLoading(true)
    const result = await updateActive(row.id, !row.active)
    handleChangeFetchingOrders()
    setLoading(false)
  }
  const handleChangeDelete = async (id: number, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteBots(id, handleChangeFetchingOrders),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      getListBots(paging, setBotList)
    }
    fetchData()
  }, [paging, setBotList])
  const label = { inputProps: { "aria-label": "Switch demo" } }

  return (
    <>
      <TableContainer
        sx={{
          minHeight: isMobileOnly ? "calc(100vh - 310px)" : "calc(100vh - 240px)",
          maxHeight: isMobileOnly
            ? "calc(100vh - 350px)"
            : "calc(100vh - 340px)",
        }}
      >
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Exchange</TableCell>
              <TableCell align="center">Round</TableCell>
              <TableCell align="center">Create Date</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {botList.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <TextName
                    onClick={() => handleView(row)}
                    style={{ minWidth: 200 }}
                  >
                    {row.name.toUpperCase()}
                  </TextName>
                </TableCell>
                <TableCell align="center">
                  {(row.exchange || "").charAt(0).toUpperCase() +
                    (row.exchange || "").slice(1)}
                </TableCell>
                <TableCell align="center">{row.round}</TableCell>
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
                <TableCell align="center" style={{ minWidth: 200 }}>
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
        count={botList.count}
        rowsPerPage={paging.size}
        page={paging.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateBot open={open} setOpen={setOpen} />
      <ViewBot open={openView} setOpen={setOpenDiaView} />
    </>
  )
})

export default ListBotsTable
