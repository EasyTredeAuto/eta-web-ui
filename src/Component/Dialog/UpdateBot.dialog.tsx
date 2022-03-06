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
} from "../Element/CreateBot.Dialog.Element"
import {
  NumberFormatCustom,
  TextFieldName,
} from "../Element/CustomMaterial.element"
import { assetState, botValueUpdateState } from "../../Recoil/atoms/coins"
import useCopyToClipboard from "../../Middleware/copyToClipboard"
import { SelectBase } from "../Element/CustomReact.element"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil"
import { coinsState, myBotsState } from "../../Recoil/atoms"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getAllMyBots, updateToken } from "../../Recoil/actions/manageOrders"

const BootstrapDialog: any = styled(Dialog)(({ theme }) => ({
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

export default function CreateBot({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false)
  }

  const [options, setOptions] = useState([] as any)
  const copy = useCopyToClipboard()[1]

  const coins = useRecoilValue(coinsState)
  const assets = useRecoilValue(assetState)
  const [value, setValue] = useRecoilState(botValueUpdateState)

  const [myBots, setMyBots] = useRecoilState(myBotsState)

  const handleSelectSymbol = (_e: any) => {
    const asset = assets.data.find((asset: string) =>
      _e.value.startsWith(asset)
    )
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

  const handleUpdateBot = async () => {
    const result = await updateToken(value)
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
        copy(result.url)
      })
    } else {
      setOpen(false)
      Swal.fire({
        icon: "error",
        title: result.message,
      })
    }
  }

  const handleChangeFetchingMyBots = async () => {
    getAllMyBots(myBots, setMyBots)
  }

  useEffect(() => {
    return setOptions(coins.data)
  }, [coins.data])

  const optionSide = [
    { value: "buy", label: "Buy" },
    { value: "sell", label: "Sell" },
  ]

  const optionType = [
    { value: "limit", label: "Limit" },
    { value: "market", label: "Market" },
  ]

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Bot
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Component col={"100%"}>
          <Component col={"20% 80%"}>
            <BoxHeader>Symbol:</BoxHeader>
            <BoxContent>
              <SelectBase
                options={options}
                isSearchable
                value={options.find(
                  (v: { value: string | undefined }) => v.value === value.symbol
                )}
                menuPosition={"fixed"}
                placeholder="Select Symbol"
                onChange={handleSelectSymbol}
              />
            </BoxContent>
            <BoxHeader>Side:</BoxHeader>
            <Component col={"40% 7% 40%"}>
              <BoxContent>
                <SelectBase
                  options={optionSide}
                  value={optionSide.find((v) => v.value === value.side)}
                  onChange={handleChangeSide}
                  menuPosition={"fixed"}
                  placeholder="Buy/Sell"
                />
              </BoxContent>
              <BoxHeader>Type:</BoxHeader>
              <BoxContent>
                <SelectBase
                  options={optionType}
                  value={optionType.find((v) => v.value === value.type)}
                  onChange={handleChangeType}
                  menuPosition={"fixed"}
                  placeholder="Limit/Market"
                />
              </BoxContent>
            </Component>
            <BoxHeader>Amount:</BoxHeader>
            <Component col={"50% 50%"}>
              <BoxContent>
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
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={value.amountType === "percent"}
                    onChange={handleChangeAmountType}
                  />
                }
                label="%"
              />
            </Component>
            <BoxHeader>Bot Name:</BoxHeader>
            <BoxContent>
              <TextFieldName
                fullWidth
                type="text"
                placeholder="Bot Name"
                name="name"
                value={value.name}
                onChange={handleChange}
              />
            </BoxContent>
          </Component>
        </Component>
      </DialogContent>
      <DialogActions>
        <BoxFooter>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "100%" }}
            autoFocus
            disabled={
              !value.id ||
              !value.name ||
              !value.symbol ||
              !value.amount ||
              (value.amountType === "amount" && value.amount < 15)
            }
            onClick={handleUpdateBot}
          >
            Save
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
}