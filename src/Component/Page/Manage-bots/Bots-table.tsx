import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  botDataState,
  botPagingState,
  botValueUpdateState,
} from "../../../Recoil/atoms"
import { botValueUpdateDto } from "../../../Recoil/atoms/bots"
import { MdContentCopy, MdDelete } from "react-icons/md"
import ViewBot from "./Detail-bot.dialog"
import UpdateBot from "./Update-bot.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import {
  deleteBots,
  getListBots,
} from "../../../Recoil/actions/Manage-bot.action"
import Swal from "sweetalert2"
import moment from "moment"
import { TextName } from "../../StyledComponent/Fontsize.element"

const ListBotsTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [openView, setOpenDiaView] = React.useState(false)
  const [paging, setPaging] = useRecoilState(botPagingState)
  const [botList, setBotList] = useRecoilState(botDataState)
  const setValue = useSetRecoilState(botValueUpdateState)
  const handleUpdate = (Api: any) => {
    console.log(Api)
    const data = {
      id: Api.id,
      name: Api.name,
      detail: Api.detail,
      symbol: Api.symbol,
      asset: Api.asset,
      currency: Api.currency,
    } as botValueUpdateDto
    setValue(data)
    setOpen(true)
  }
  const handleView = (Api: any) => {
    const data = {
      id: Api.id,
      name: Api.name,
      detail: Api.detail,
      symbol: Api.symbol,
      asset: Api.asset,
      currency: Api.currency,
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

  return (
    <>
      <TableContainer
        sx={{
          minHeight: 460,
          maxHeight: "calc(100vh - 250px)",
        }}
      >
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Round</TableCell>
              <TableCell align="center">Create Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {botList.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="left">
                  <TextName onClick={() => handleView(row)}>
                    {row.name}
                  </TextName>
                </TableCell>
                <TableCell align="center">
                  {row.symbol.toLocaleUpperCase()}
                </TableCell>
                <TableCell align="center">{row.round}</TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format("DD MMM YYYY HH:mm")}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy purchase url" placement="top">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(row.urlBuy)
                      }}
                    >
                      <MdContentCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy sales url" placement="top">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(row.urlSell)
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
