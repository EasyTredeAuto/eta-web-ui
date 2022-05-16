import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
// import liff from "@line/liff"
// import { lineProfileState } from "../../Recoil/atoms"
// import { useRecoilState } from "recoil"
// import { LineProfileDto } from "../../Recoil/atoms/todo-line"

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
        ></IconButton>
      ) : null}
    </DialogTitle>
  )
}

interface Props {
  open: boolean
  setOpen: any
}

const DialogConfigLine = React.memo(({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false)
  }

  // const [lineProfile, setLineProfile] = useRecoilState(lineProfileState)

  // React.useEffect(() => {
  //   const fetchConfigLine = () => {
  //     const ConfigLiffId = {
  //       liffId: process.env.REACT_APP_LINE_LIFFID as string,
  //     }
  //     liff.init(
  //       ConfigLiffId,
  //       () => {
  //         if (liff.isLoggedIn()) {
  //           const idToken = liff.getIDToken()
  //           liff.getProfile().then((profile) => {
  //             const { displayName, pictureUrl, statusMessage, userId } =
  //               profile as LineProfileDto
  //             setLineProfile({
  //               displayName,
  //               pictureUrl,
  //               statusMessage,
  //               userId,
  //               idToken,
  //             })
  //           })
  //         } else {
  //           liff.login()
  //         }
  //       },
  //       (err) => console.log(err)
  //     )
  //   }

  //   fetchConfigLine()
  // }, [setLineProfile])

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Line Profile
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Button color="success" variant="contained">
          line login
        </Button>
      </DialogContent>
    </BootstrapDialog>
  )
})

export default DialogConfigLine
