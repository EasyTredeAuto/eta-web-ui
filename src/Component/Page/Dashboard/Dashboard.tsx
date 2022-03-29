import React from "react"
import {
  BoxContent,
  BoxHeader,
  Component,
} from "../../StyledComponent/Dashboard.Element"
import { Title } from "../../StyledComponent/Fontsize.element"
import { GiPayMoney, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi"
import TransactionLatest from "./Transaction-vidget"
import { Grid } from "@mui/material"

const Dashboard = React.memo(() => {
  console.log(5)

  const data = 100000

  return (
    <Component col={"100%"}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiPayMoney /> Cost All
              </Title>
              <Title>{data.toLocaleString()} ฿</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiTakeMyMoney /> Profit All
              </Title>
              <Title>{data.toLocaleString()} ฿</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiMoneyStack /> Balance All
              </Title>
              <Title>{data.toLocaleString()} ฿</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12}>
          <BoxContent>
            <Title>Transaction Latest</Title>
            <TransactionLatest />
          </BoxContent>
        </Grid>
      </Grid>
    </Component>
  )
})

export default Dashboard
