import * as React from "react"
import Swal from "sweetalert2"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { deleteMyBot, getAllMyBots } from "../../../Recoil/actions/myBot"
import { useRecoilState, useSetRecoilState } from "recoil"
import { botValueUpdateState, myBotsState } from "../../../Recoil/atoms"
import useCopyToClipboard from "../../../Middleware/copyToClipboard"
import { botUpdateValueReq } from "../../../Recoil/atoms/coins"
import { MdContentCopy, MdDelete } from "react-icons/md"
import UpdateBot from "../../Dialog/UpdateBot.dialog"
import { IconButton, Tooltip } from "@mui/material"
import { FaEdit } from "react-icons/fa"

export default function Overview() {
  const [open, setOpen] = React.useState(false)
  const [valueUrl, copy] = useCopyToClipboard()
  const [myBots, setMyBots] = useRecoilState(myBotsState)
  const setValue = useSetRecoilState(botValueUpdateState)

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
    } as botUpdateValueReq
    setValue(data)
    setOpen(true)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setMyBots({ ...myBots, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMyBots({ ...myBots, size: parseInt(event.target.value, 10), page: 0 })
  }

  const handleChangeFetchingMyBots = async () => {
    getAllMyBots(myBots, setMyBots)
  }
  const handleChangeDelete = async (id: number, name: string) => {
    Swal.fire({
      icon: "info",
      title: `Are you sure to delete a bot ${name}?`,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: () => deleteMyBot(id, handleChangeFetchingMyBots),
      showCancelButton: true,
    })
  }

  React.useEffect(() => {
    handleChangeFetchingMyBots()
  }, [myBots.size])

  React.useEffect(() => {
    handleChangeFetchingMyBots()
  }, [myBots.page])

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
            {myBots.data.map((row, i) => (
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
        count={myBots.count}
        rowsPerPage={myBots.size}
        page={myBots.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateBot open={open} setOpen={setOpen} />
    </>
  )
}
