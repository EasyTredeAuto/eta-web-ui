import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { useRecoilState } from "recoil"
import { userPagingState, userListDataState } from "../../../Recoil/atoms"
import moment from "moment"
import { getUserList } from "../../../Recoil/actions/Users"
import { Switch } from "@mui/material"
import { isMobileOnly } from "mobile-device-detect"
import { TableContainer } from "../../StyledComponent/CustomTable.Mui"

const ListBotsTable = React.memo(() => {
  const [paging, setPaging] = useRecoilState(userPagingState)
  const [userList, setUserList] = useRecoilState(userListDataState)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaging({ ...paging, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaging({ ...paging, size: parseInt(event.target.value, 10), page: 0 })
  }

  React.useEffect(() => {
    function fetchData() {
      getUserList(paging, setUserList)
    }
    fetchData()
  }, [paging, setUserList])

  const label = { inputProps: { "aria-label": "Switch demo" } }

  return (
    <>
      <TableContainer
        sx={{
          minHeight: isMobileOnly ? "70vh" : 460,
          maxHeight: "calc(100vh - 250px)",
        }}
      >
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Roles</TableCell>
              <TableCell align="center">User Active</TableCell>
              <TableCell align="center">Api Active</TableCell>
              <TableCell align="center">Create Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="center">{row.roles}</TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  <Switch {...label} checked={row.status === 'active'} disabled />
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  <Switch {...label} checked={row.apiActive} disabled />
                </TableCell>
                <TableCell align="center" style={{ minWidth: 200 }}>
                  {moment(row.createdAt).format("DD MMM YYYY HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userList.count}
        rowsPerPage={paging.size}
        page={paging.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
})

export default ListBotsTable
