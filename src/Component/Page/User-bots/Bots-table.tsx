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
  botUserDataState,
  botUserPagingState,
  botValueUserUpdateState,
  botDataOptionState,
} from "../../../Recoil/atoms"
import {
  botsUserDto,
  botsUserViewDiaDto,
  botValueUserUpdateDto,
  botUserViewState,
} from "../../../Recoil/atoms/user-bot"
import { MdDelete } from "react-icons/md"
import UpdateBot from "./Update-bot.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import {
  deleteBots,
  getListBots,
  getListBotsOption,
  updateActive,
} from "../../../Recoil/actions/User-bot.action"
import Swal from "sweetalert2"
import moment from "moment"
import { TextName } from "../../StyledComponent/Fontsize.element"
import ViewBot from "./Detail-bot.dialog"
import { isMobileOnly } from "mobile-device-detect"

const ListBotsTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [openView, setOpenDiaView] = React.useState(false)
  const [paging, setPaging] = useRecoilState(botUserPagingState)
  const [botList, setBotList] = useRecoilState(botUserDataState)
  const setBotListOption = useSetRecoilState(botDataOptionState)
  const setValue = useSetRecoilState(botValueUserUpdateState)
  const setValueView = useSetRecoilState(botUserViewState)
  const handleUpdate = (Api: botsUserDto) => {
    const data = {
      id: Api.id,
      type: Api.type,
      amount: parseFloat(Api.amount),
      amountType: Api.amountType,
      indicatorIds: Api.indicatorIds,
      symbol: Api.symbol,
      asset: Api.symbol.split("USDT").join(""),
      base: "USDT",
      active: Api.active,
      allSymbol: false,
      timeFleam: Api.timeFleam,
      range: Api.range,
    } as botValueUserUpdateDto
    setValue(data)
    setOpen(true)
  }

  const handleView = (Api: any) => {
    const data = {
      name: Api.name,
      description: Api.description,
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
  const handleActiveBot = async (row: any) => {
    setLoading(true)
    await updateActive(row.id, !row.active)
    handleChangeFetchingOrders()
    setLoading(false)
  }

  const handleChangeDelete = async (row: botsUserDto) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${row.symbol} on ${row.name} ?`,
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
              <TableCell align="center">Indicator</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Amount / Unit</TableCell>
              <TableCell align="center">TimeFleam</TableCell>
              <TableCell align="center">Range</TableCell>
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
                    style={{ minWidth: 100 }}
                  >
                    {(row.name || "").toUpperCase()}
                  </TextName>
                </TableCell>
                <TableCell align="center">{row.symbol}</TableCell>
                <TableCell align="center" style={{ minWidth: 150 }}>
                  {row.name === "rebalance"
                    ? "50 %"
                    : `${parseFloat(row.amount)}
                        ${row.amountType === "currency" ? row.base : "%"}
                   `}
                </TableCell>
                <TableCell align="center">{row.timeFleam}</TableCell>
                <TableCell align="center">
                  {row.name === "rebalance" ? "-" : row.range}
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
