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

import { indicatorsDto, indicatorUpdateDto } from "../../../Recoil/atoms/admin-indicator"
import { MdDelete } from "react-icons/md"
import ViewBot from "./Detail-indicator.dialog"
import UpdateBot from "./Update-indicator.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"
import Swal from "sweetalert2"
import moment from "moment"
import { TextName } from "../../StyledComponent/Fontsize.element"
import { isMobileOnly } from "mobile-device-detect"
import * as Actions from "../../../Recoil/actions/Admin-Indicator.action"
import * as Atoms from "../../../Recoil/atoms"

const ListBotsTable = React.memo(() => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [openView, setOpenDiaView] = React.useState(false)
  const [paging, setPaging] = useRecoilState(Atoms.indicatorsPagingState)
  const [botList, setBotList] = useRecoilState(Atoms.indicatorsState)
  const setValue = useSetRecoilState(Atoms.indicatorUpdateState)

  const handleUpdate = (Api: indicatorsDto) => {
    const data = {
      id: Api.id,
      name: Api.name,
      description: Api.description,
      exchange: Api.exchange,
    } as indicatorUpdateDto
    setValue(data)
    setOpen(true)
  }

  const handleView = (Api: indicatorsDto) => {
    const data = {
      id: Api.id,
      name: Api.name,
      description: Api.description,
    } as indicatorUpdateDto
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

  const handleChangeFetchingIndicators = async () => {
    Actions.getAllIndicators(paging, setBotList)
  }
  
  const handleActiveBot = async (row: any) => {
    setLoading(true)
    await Actions.activeIndicator(row.id, !row.active)
    handleChangeFetchingIndicators()
    setLoading(false)
  }
  const handleChangeDelete = async (id: number, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete this ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => Actions.deleteIndicators(id, handleChangeFetchingIndicators),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    function fetchData() {
      Actions.getAllIndicators(paging, setBotList)
    }
    fetchData()
  }, [paging, setBotList])

  const label = { inputProps: { "aria-label": "Switch demo" } }
  const sxStyle = {
    minHeight: isMobileOnly ? "calc(100vh - 310px)" : "calc(100vh - 240px)",
    maxHeight: isMobileOnly ? "calc(100vh - 350px)" : "calc(100vh - 340px)",
  }
  return (
    <>
      <TableContainer sx={sxStyle}>
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
                    style={{ minWidth: 100 }}
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
