import React from "react"
import {
  BoxContent,
  BoxHeader,
  Component,
} from "../../Element/Dashboard.Element"
import { Title } from "../../Element/Fontsize.element"
import { GiPayMoney, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi"
import TransactionLatest from "./TransactionLatest"

const Dashboard = React.memo(() => {
  console.log(5)

  const data = 100000
  return (
    <Component col={"100%"}>
      <Component>
        <BoxContent>
          <BoxHeader>
            <Title>
              <GiPayMoney /> Cost All
            </Title>
            <Title>{data.toLocaleString()} ฿</Title>
          </BoxHeader>
        </BoxContent>
        <BoxContent>
          <BoxHeader>
            <Title>
              <GiTakeMyMoney /> Profit All
            </Title>
            <Title>{data.toLocaleString()} ฿</Title>
          </BoxHeader>
        </BoxContent>
        <BoxContent>
          <BoxHeader>
            <Title>
              <GiMoneyStack /> Balance All
            </Title>
            <Title>{data.toLocaleString()} ฿</Title>
          </BoxHeader>
        </BoxContent>
      </Component>
      <BoxContent>
        <Title>Transaction Latest</Title>
        <TransactionLatest />
      </BoxContent>
    </Component>
  )
})

export default Dashboard
