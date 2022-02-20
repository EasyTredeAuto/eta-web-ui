import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

import {
  BoxContent,
  BoxHeader,
  Component,
  BoxFooter,
} from "../Element/CreateBot.Dialog.Element"
import { SelectBase } from "../Element/CustomReact.element"
import { TextFieldName } from "../Element/CustomMaterial.element"
import { Checkbox, FormControlLabel } from "@mui/material"
import { coinsState } from "../../Recoil/atoms"
import { useRecoilValue } from "recoil"
import { Coins } from "../../Recoil/atoms/coins"
import { useEffect, useState } from "react"

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
  const coins = useRecoilValue(coinsState)

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
                menuPosition={"fixed"}
                placeholder="Select Symbol"
              />
            </BoxContent>
            {/* <BoxHeader>Currency:</BoxHeader>
            <BoxContent>
              <SelectBase
                options={options}
                menuPosition={"fixed"}
                placeholder="Select Currency"
              />
            </BoxContent> */}
            <BoxHeader>Side:</BoxHeader>
            <Component col={"40% 7% 40%"}>
              <BoxContent>
                <SelectBase
                  options={optionSide}
                  menuPosition={"fixed"}
                  placeholder="Buy/Sell"
                />
              </BoxContent>
              <BoxHeader>Type:</BoxHeader>
              <BoxContent>
                <SelectBase
                  options={optionType}
                  menuPosition={"fixed"}
                  placeholder="Limit/Market"
                />
              </BoxContent>
            </Component>

            <BoxHeader>Amount:</BoxHeader>
            <Component col={"50% 50%"}>
              <BoxContent>
                <TextFieldName
                  fullWidth
                  type="text"
                  placeholder="Amount Currency"
                  name="amount"
                />
              </BoxContent>
              <FormControlLabel control={<Checkbox />} label="%" />
            </Component>
            <BoxHeader>Bot Name:</BoxHeader>
            <BoxContent>
              <TextFieldName
                fullWidth
                type="text"
                placeholder="Bot Name"
                name="botName"
              />
            </BoxContent>
          </Component>
        </Component>
      </DialogContent>
      <DialogActions>
        <BoxFooter>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            autoFocus
            onClick={handleClose}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="error"
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
