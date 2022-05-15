import React, { useEffect } from "react"
import {
  BoxContent,
  BoxHeader,
  Component,
} from "../../StyledComponent/Dashboard.Element"
import { Title } from "../../StyledComponent/Fontsize.element"
import { GiPayMoney, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi"
import { Grid } from "@mui/material"
import { useRecoilState } from "recoil"
import { dashboardCostState, dashboardWidgetState } from "../../../Recoil/atoms"
import {
  getDashboardCost,
  getExchangeWidgets,
} from "../../../Recoil/actions/User-dashboard.action"
import ExchangeWidgets from "./ExchangeWidgets"
import TransactionLatest from "./Transaction-widget"

const Dashboard = React.memo(() => {
  const [data, setData] = useRecoilState(dashboardCostState)
  const [widgets, setWidget] = useRecoilState(dashboardWidgetState)
  useEffect(() => {
    const fetchData = () => {
      getDashboardCost(setData)
      getExchangeWidgets(setWidget)
    }
    fetchData()
  }, [setData, setWidget])

  return (
    <Component col={"100%"}>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiPayMoney /> Invest all
              </Title>
              <Title>{data.cost.toLocaleString()} $</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiTakeMyMoney /> All sold
              </Title>
              <Title>{data.takeProfit.toLocaleString()} $</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <BoxContent>
            <BoxHeader>
              <Title>
                <GiMoneyStack /> Total net profit
              </Title>
              <Title>{data.netProfit.toLocaleString()} $</Title>
            </BoxHeader>
          </BoxContent>
        </Grid>
        <Grid item xs={12}>
          <BoxContent>
            <Title>Transaction Latest</Title>
            <TransactionLatest />
          </BoxContent>
        </Grid>
        {widgets.map((x, i) => (
          <Grid item xs={12} md={6} key={i}>
            <BoxContent style={{ alignItems: "left" }}>
              <Title>
                {x.exchange.charAt(0).toUpperCase() + x.exchange.slice(1)}
              </Title>
              <ExchangeWidgets widget={x} />
            </BoxContent>
          </Grid>
        ))}
      </Grid>
    </Component>
  )
})

export default Dashboard
