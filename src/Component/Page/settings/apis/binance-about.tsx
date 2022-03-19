import * as React from "react"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import { Carousel } from "react-bootstrap"

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

interface Props {
  open: boolean
  setOpen: any
}

const ApiAbout = React.memo(({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="binance-1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="binance-2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="binance-3.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="binance-4.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </BootstrapDialog>
  )
})

export default ApiAbout
