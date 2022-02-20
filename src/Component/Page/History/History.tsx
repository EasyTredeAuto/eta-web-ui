import { Grid } from "@mui/material"
import React from "react"
import Select from "react-select"
import { useRecoilState } from "recoil"
import { getTransaction } from "../../../Recoil/actions/transaction"
import { transactionState } from "../../../Recoil/atoms"
import { TextFieldSearch } from "../../Element/CustomMaterial.element"
import { Component } from "../../Element/History.Element"
import SpotHistoryTable from "./HistoryTable"

const GridStyle = {
  gridGap: "1rem",
  padding: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}

export default function History() {
  const options = [
    { value: "spot", label: "Spot" },
    // { value: "futures", label: "Futures" },
  ]
  const [transaction, setTransaction] = useRecoilState(transactionState)

  React.useEffect(() => {
    getTransaction(transaction, setTransaction)
      .then((result) => result)
      .catch((err) => err)
  }, [])

  return (
    <Component style={GridStyle} col={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextFieldSearch
            fullWidth
            type="text"
            label="Bot Name"
            name="botName"
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldSearch fullWidth type="datetime-local" name="timeFrame" />
        </Grid>
        <Grid item xs={4}>
          <TextFieldSearch fullWidth type="datetime-local" name="timeFrame" />
        </Grid>
        <Grid item xs={4}>
          <Select
            options={options}
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
            options={options}
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
            options={options}
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
}
