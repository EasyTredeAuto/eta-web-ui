import { Grid } from "@mui/material"
import React, { memo } from "react"
import Select from "react-select"
import { TextFieldSearch } from "../../Element/CustomMaterial.element"
import { Component } from "../../Element/History.Element"
import SpotHistoryTable from "./HistoryTable"

const GridStyle = {
  gridGap: "1rem",
  padding: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}

const History = memo(() => {
  console.log(8)

  const options = [
    { value: "spot", label: "Spot" },
    // { value: "futures", label: "Futures" },
  ]

  return (
    <Component style={GridStyle} col={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextFieldSearch
            fullWidth
            type="text"
            label="Api Name"
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
})

export default History
