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
  botUserDataState,
  botUserPagingState,
  botValueUserUpdateState,
  botDataOptionState,
} from "../../../Recoil/atoms"
import {
  botsUserDto,
  botsUserViewDiaDto,
  botValueUserUpdateDto,
  botUserViewState
} from "../../../Recoil/atoms/usedBot"
import { MdContentCopy, MdDelete } from "react-icons/md"
import UpdateBot from "./Update-bot.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import {
  deleteBots,
  getListBots,
  getListBotsOption,
} from "../../../Recoil/actions/Used-bot.action"
import Swal from "sweetalert2"
import moment from "moment"
import { TextName } from "../../StyledComponent/Fontsize.element"
import ViewBot from "./Detail-bot.dialog"

const ListBotsTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [openView, setOpenDiaView] = React.useState(false)
  const [paging, setPaging] = useRecoilState(botUserPagingState)
  const [botList, setBotList] = useRecoilState(botUserDataState)
  const setBotListOption = useSetRecoilState(botDataOptionState)
  const setValue = useSetRecoilState(botValueUserUpdateState)
  const setValueView = useSetRecoilState(botUserViewState)
  const handleUpdate = (Api: any) => {
    const data = {
      id: Api.id,
      type: Api.type,
      amount: Api.amount,
      amountType: Api.amountType,
      botId: Api.botIds,
    } as botValueUserUpdateDto
    setValue(data)
    setOpen(true)
  }

  const handleView = (Api: any) => {
    const data = {
      name: Api.name,
      detail: Api.detail,
    } as botsUserViewDiaDto
    setValueView(data)
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
  const handleChangeDelete = async (row: botsUserDto, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteBots(row, handleChangeFetchingOrders),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      getListBots(paging, setBotList)
    }
    fetchData()
  }, [paging, setBotList])

  React.useEffect(() => {
    function fetchData() {
      getListBotsOption(setBotListOption)
    }
    fetchData()
  }, [setBotListOption])

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
              <TableCell align="center">Amount / Unit</TableCell>
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
                <TableCell align="center">
                  {`${parseFloat(row.amount)} ${
                    row.amountType === "amount" ? row.currency : "%"
                  }`}
                </TableCell>
                <TableCell align="center">{row.round}</TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format("DD MMM YYYY HH:mm")}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleUpdate(row)}>
                      <FaEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <IconButton
                      onClick={() => handleChangeDelete(row, row.name)}
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
