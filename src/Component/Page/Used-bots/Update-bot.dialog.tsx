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
import { NumberFormatCustom } from "../../StyledComponent/CustomMaterial.element"
import { Checkbox, FormControlLabel, Grid } from "@mui/material"
import {
  botValueUserUpdateState,
  botUserPagingState,
  botUserDataState,
  botDataOptionState,
  binanceAssetState,
} from "../../../Recoil/atoms"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import Swal from "sweetalert2"
import {
  getListBots,
  updateBots,
} from "../../../Recoil/actions/Used-bot.action"
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
  console.log(1)
  const handleClose = () => {
    setOpen(false)
  }
  const [options, setOptions] = React.useState([] as any)

  const [value, setValue] = useRecoilState(botValueUserUpdateState)
  const paging = useRecoilValue(botUserPagingState)
  const data = useRecoilValue(botDataOptionState)
  const setBotList = useSetRecoilState(botUserDataState)
  const symbols = useRecoilValue(binanceAssetState)

  React.useEffect(() => {
    function fetOptions() {
      let _options = []
      for (let i = 0; i < data.length; i++) {
        _options.push({ label: data[i].name, value: data[i].id })
      }
      setOptions(_options)
    }
    fetOptions()
  }, [data, setOptions])

  const handleChangeBot = (_e: any) => {
    setValue({ ...value, indicatorIds: _e.value })
  }

  const handleChangeType = (_e: any) => {
    setValue({ ...value, type: _e.value })
  }

  const handleChangeAmountType = (_e: any) => {
    if (_e.target.checked) {
      const amount = value.amount && value.amount > 100 ? 100 : value.amount
      setValue({ ...value, amountType: "percent", amount })
    } else {
      setValue({ ...value, amountType: "currency" })
    }
  }
  const handleChangeTimeFleam = (_e: any) => {
    setValue({ ...value, timeFleam: _e.value })
  }
  const handleChangeRange = (_e: any) => {
    setValue({ ...value, range: _e.value })
  }
  const handleChangeSymbol = (_e: any) => {
    const [asset, base] = _e.value.split("/")
    const symbol = `${asset}${base}`
    setValue({
      ...value,
      symbol,
      asset,
      base,
    })
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

  const handleUpdateBot = async () => {
    const result = await updateBots(value)
    if (result?.data) {
      await handleChangeFetchingMyBots()
      setOpen(false)
      Swal.fire({
        showConfirmButton: false,
        timer: 1500,
        title: result.message,
        icon: "success",
      })
    } else {
      setOpen(false)
      Swal.fire({
        icon: "error",
        title: result.message,
      })
    }
  }

  const optionType = [
    { value: "limit", label: "Limit" },
    { value: "market", label: "Market" },
  ]
  const optionTime = [
    { value: "15m", label: "15m" },
    { value: "4h", label: "4h" },
    { value: "1d", label: "1d" },
  ]
  const optionRang = [
    { value: "sideway", label: "Sideway" },
    { value: "trend", label: "Trend" },
  ]
  const handleChangeFetchingMyBots = async () => {
    getListBots(paging, setBotList)
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
        Edit System Bot
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Component col={"100%"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>System Bot:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={options}
                  value={options.find(
                    (v: { value: number | undefined }) =>
                      v.value === value.indicatorIds
                  )}
                  onChange={handleChangeBot}
                  menuPosition={"fixed"}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Symbol:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={symbols.data}
                  value={symbols.data.find((v) => v.value.split("/").join("") === value.symbol)}
                  onChange={handleChangeSymbol}
                  menuPosition={"fixed"}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Type:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>TimeFleam:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={optionTime}
                  value={optionTime.find((v) => v.value === value.timeFleam)}
                  onChange={handleChangeTimeFleam}
                  menuPosition={"fixed"}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Range:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  options={optionRang}
                  value={optionRang.find((v) => v.value === value.range)}
                  onChange={handleChangeRange}
                  menuPosition={"fixed"}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Amount:</BoxHeader>
            </Grid>
            <Grid item xs={9} sm={4} lg={6}>
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
            </Grid>
            <Grid item xs={3} sm={4} lg={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={value.amountType === "percent"}
                    onChange={handleChangeAmountType}
                  />
                }
                label="%"
              />
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
              !value.id || !value.amount || !value.indicatorIds || !value.type
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
})

export default CreateOrder
