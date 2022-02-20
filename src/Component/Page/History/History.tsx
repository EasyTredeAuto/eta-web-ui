import React from "react"
import Select from "react-select"
import { useRecoilState } from "recoil"
import { getTransaction } from "../../../Recoil/actions/transaction"
import { transactionState } from "../../../Recoil/atoms"
import { TextFieldSearch } from "../../Element/CustomMaterial.element"
import { Component } from "../../Element/History.Element"
import HistoryTable from "./HistoryTable"

export default function History() {
  const options = [
    { value: "spot", label: "Spot" },
    { value: "futures", label: "Futures" },
  ]

  const [transaction, setTransaction] = useRecoilState(transactionState)

  React.useEffect(() => {
    getTransaction(transaction, setTransaction)
      .then((result) => result)
      .catch((err) => err)
  }, [])

  return (
    <Component col={"100%"}>
      <Component col={"20% 20% 20%"}>
        <Select options={options} placeholder="Select Trade" />
        <TextFieldSearch
          fullWidth
          type="text"
          label="Name Bot"
          name="nameBot"
        />
        <TextFieldSearch
          fullWidth
          type="text"
          label="Time Frame"
          name="timeFrame"
        />
      </Component>
      <HistoryTable />
    </Component>
  )
}
