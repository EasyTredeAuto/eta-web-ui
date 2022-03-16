import { Grid } from "@mui/material"
import moment from "moment"
import React, { memo, useState, useEffect } from "react"
import Select from "react-select"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  coinsState,
  exchangeState,
  transactionPagingState,
} from "../../../Recoil/atoms"
import { TextFieldSearch } from "../../StyledComponent/CustomMaterial.element"
import { Component } from "../../StyledComponent/History.Element"
import SpotHistoryTable from "./transaction-table"

const GridStyle = {
  gridGap: "1rem",
  padding: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}
const sideOption = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
]
const typeOption = [
  { label: "Limit", value: "limit" },
  { label: "Market", value: "market" },
]
interface optionDto {
  label: string
  value: string
}
const History = memo(() => {
  const [paging, setPaging] = useRecoilState(transactionPagingState)
  const exchangesOption = useRecoilValue(exchangeState)
  const coins = useRecoilValue(coinsState)
  const [options, setOptions] = useState([] as optionDto[])

  const handleChangeSide = (e: any) => {
    if (e) setPaging({ ...paging, side: e.value })
    else setPaging({ ...paging, side: null })
  }
  const handleChangeType = (e: any) => {
    if (e) setPaging({ ...paging, type: e.value })
    else setPaging({ ...paging, type: null })
  }

  useEffect(() => {
    setOptions(coins.data)
  }, [coins.data])

  return (
    <Component style={GridStyle} col={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextFieldSearch
            fullWidth
            defaultValue={moment().startOf("day").format("YYYY-MM-DDTHH:mm")}
            type="datetime-local"
            name="timeFrame"
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldSearch
            fullWidth
            defaultValue={moment().endOf("day").format("YYYY-MM-DDTHH:mm")}
            type="datetime-local"
            name="timeFrame"
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            options={exchangesOption}
            value={exchangesOption.find((x) => x.value === paging.exchange)}
            isClearable
            isSearchable
            placeholder="Exchange"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            options={options}
            value={options.find((x) => x.value === paging.symbol)}
            isClearable
            isSearchable
            placeholder="Symbol"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            options={sideOption}
            value={sideOption.find((x) => x.value === paging.side)}
            onChange={handleChangeSide}
            isClearable
            isSearchable
            placeholder="Side"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            options={typeOption}
            value={typeOption.find((x) => x.value === paging.type)}
            onChange={handleChangeType}
            isClearable
            isSearchable
            placeholder="Type"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </Grid>
      </Grid>
      <SpotHistoryTable />
    </Component>
  )
})

export default History
