import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"

import {
  BoxContent,
  BoxHeader,
  Component,
  BoxFooter,
} from "../../StyledComponent/CreateOrder.Dialog.Element"
import { SelectBase } from "../../StyledComponent/CustomReact.element"
import {
  NumberFormatCustom,
  TextFieldName,
} from "../../StyledComponent/CustomMaterial.element"
import { Checkbox, FormControlLabel, Grid } from "@mui/material"
import {
  assetState,
  orderValueState,
  coinsState,
  orderDataState,
  orderPagingState,
} from "../../../Recoil/atoms"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import {
  getListOrders,
  createToken,
} from "../../../Recoil/actions/Manage-orders.action"
import { isMobileOnly } from "mobile-device-detect"

const BootstrapDialog: any = styled(Dialog)(({ theme }: any) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

interface Props {
  open: boolean
  setOpen: any
}

const CreateOrder = React.memo(({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false)
  }

  const [options, setOptions] = useState([] as any)

  const coins = useRecoilValue(coinsState)
  const assets = useRecoilValue(assetState)
  const [value, setValue] = useRecoilState(orderValueState)
  const paging = useRecoilValue(orderPagingState)
  const setOrderList = useSetRecoilState(orderDataState)

  const handleSelectSymbol = (_e: any) => {
    const asset = assets.data.find((x:string) => _e.value.startsWith(x))
    const currency = _e.value.split(asset)[1]
    setValue({ ...value, asset, currency, symbol: _e.value })
  }

  const handleChangeSide = (_e: any) => {
    setValue({ ...value, side: _e.value })
  }

  const handleChangeType = (_e: any) => {
    setValue({ ...value, type: _e.value })
  }

  const handleChangeAmountType = (_e: any) => {
    if (_e.target.checked) {
      const amount = value.amount && value.amount > 100 ? 100 : value.amount
      setValue({ ...value, amountType: "percent", amount })
    } else {
      setValue({ ...value, amountType: "amount" })
    }
  }

  const handleChangeAmount = (e: any) => {
    const elementValue = parseFloat(e.target.value.split(",").join(""))
    const elementName = e.target.name
    if (value.amountType === "percent") {
      const amount = elementValue > 100 ? 100 : elementValue
      setValue({
        ...value,
        [elementName]: amount,
      })
    } else setValue({ ...value, [elementName]: elementValue })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementValue = e.target.value
    const elementName = e.target.name
    setValue({ ...value, [elementName]: elementValue })
  }

  const handleCreateOrder = async () => {
    const result = await createToken(value)
    if (result.url) {
      await handleChangeFetchingMyBots()
      setOpen(false)
      Swal.fire({
        icon: "success",
        title: result.message,
        html: `<div>
        <label>Url</label>
        <input  type="text" disabled value="${result.url}" />
        </div>`,
        confirmButtonText: "Copy",
      }).then(() => {
        Swal.fire({
          showConfirmButton: false,
          timer: 1500,
          title: "Copied!",
          icon: "success",
        })
        navigator.clipboard.writeText(result.url)
      })
    } else {
      setOpen(false)
      Swal.fire({
        icon: "error",
        title: result.message,
      })
    }
  }

  useEffect(() => {
    setOptions(coins.data)
  }, [coins.data])

  const optionSide = [
    { value: "buy", label: "Buy" },
    { value: "sell", label: "Sell" },
  ]

  const optionType = [
    { value: "limit", label: "Limit" },
    { value: "market", label: "Market" },
  ]

  const handleChangeFetchingMyBots = async () => {
    getListOrders(paging, setOrderList)
  }

  const label = { justifyContent: isMobileOnly ? "flex-start" : "flex-end" }
  const StyleContent = { width: isMobileOnly ? "100%" : "90%" }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Api
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Component col={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Symbol</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={options}
                  isSearchable
                  value={options.find(
                    (v: { value: string | undefined }) =>
                      v.value === value.symbol
                  )}
                  menuPosition={"fixed"}
                  placeholder="Select Symbol"
                  onChange={handleSelectSymbol}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Side</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={optionSide}
                  value={optionSide.find((v) => v.value === value.side)}
                  onChange={handleChangeSide}
                  menuPosition={"fixed"}
                  placeholder="Buy/Sell"
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Type</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={optionType}
                  value={optionType.find((v) => v.value === value.type)}
                  onChange={handleChangeType}
                  menuPosition={"fixed"}
                  placeholder="Limit/Market"
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={3} lg={2}>
              <BoxHeader style={label}>Amount</BoxHeader>
            </Grid>
            <Grid item xs={9} sm={7} lg={6}>
              <BoxContent style={StyleContent}>
                <NumberFormatCustom
                  placeholder={
                    value.amountType !== "percent" ? "Minimum 15 token" : ""
                  }
                  name="amount"
                  value={value.amount}
                  thousandSeparator
                  isNumericString
                  onChange={handleChangeAmount}
                />
              </BoxContent>
            </Grid>
            <Grid item xs={3} sm={2} lg={2}>
              <BoxContent style={StyleContent}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={value.amountType === "percent"}
                      onChange={handleChangeAmountType}
                    />
                  }
                  label="%"
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Api Name</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent style={StyleContent}>
                <TextFieldName
                  fullWidth
                  type="text"
                  placeholder="Api Name"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                />
              </BoxContent>
            </Grid>
          </Grid>
        </Component>
      </DialogContent>
      <DialogActions>
        <BoxFooter>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            autoFocus
            disabled={
              !value.name ||
              !value.symbol ||
              !value.amount ||
              (value.amountType === "amount" && value.amount < 15)
            }
            onClick={handleCreateOrder}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ background: "#aaa", width: "100%", marginLeft: "0.5rem" }}
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
        </BoxFooter>
      </DialogActions>
    </BootstrapDialog>
  )
})

export default CreateOrder
