import * as React from "react"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import { Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { botValueUpdateState } from "../../../Recoil/atoms"

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

const ViewBot = React.memo(({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false)
  }
  const value = useRecoilValue(botValueUpdateState)

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        System Detail
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {value.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {value.detail}
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  )
})

export default ViewBot
