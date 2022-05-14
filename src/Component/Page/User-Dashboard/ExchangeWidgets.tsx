import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import React from "react"
import { DashboardExchangeWidgetDto } from "../../../Recoil/atoms/user-dashboard"
import { BoxHeader } from "../../StyledComponent/Dashboard.Element"
import { Title } from "../../StyledComponent/Fontsize.element"

interface props {
  widget: DashboardExchangeWidgetDto
}
const fontWeight = { fontWeight: "bolder" }
const border = { "&:last-child td, &:last-child th": { border: 0 } }
const ExchangeWidgets = React.memo(({ widget }: props) => {
  const [page, setPage] = React.useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Grid container justifyContent="space-around" spacing={2}>
      <Grid item xs={5}>
        <BoxHeader>
          <Title>Valuable coins</Title>
          <Title>{widget.count} token</Title>
        </BoxHeader>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <BoxHeader>
          <Title>Total </Title>
          <Title>{widget.totalValue.toLocaleString()} USD</Title>
        </BoxHeader>
      </Grid>
      <TableContainer>
        <Table size="small" aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={fontWeight}>
                Asset
              </TableCell>
              <TableCell align="right" sx={fontWeight}>
                Allocation
              </TableCell>
              <TableCell align="right" sx={fontWeight}>
                Price
              </TableCell>
              <TableCell align="right" sx={fontWeight}>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {widget.assets
              .filter((_, i) => i < (page + 1) * 5 && i >= page * 5)
              .map((item, i) => (
                <TableRow key={i} sx={border}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="right">
                    {item?.allocation
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">
                    {item?.price ? item.price.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell align="right">
                    {item?.value ? item.value.toLocaleString() : "-"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={widget.count}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
      />
    </Grid>
  )
})

export default ExchangeWidgets
