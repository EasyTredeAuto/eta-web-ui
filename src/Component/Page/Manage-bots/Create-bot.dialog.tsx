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
import { Grid } from "@mui/material"
import {
  botValueState,
  botPagingState,
  botDataState,
  exchangeState,
} from "../../../Recoil/atoms"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import Swal from "sweetalert2"
import {
  getListBots,
  createBots,
} from "../../../Recoil/actions/Indicator.action"
import { isMobileOnly } from "mobile-device-detect"
import { SelectBase } from "../../StyledComponent/CustomReact.element"
import { TextFieldName } from "../../StyledComponent/CustomMaterial.element"

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

  const [value, setValue] = useRecoilState(botValueState)
  const paging = useRecoilValue(botPagingState)
  const setBotList = useSetRecoilState(botDataState)
  const exchanges = useRecoilValue(exchangeState)
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementValue = e.target.value
    const elementName = e.target.name
    setValue({ ...value, [elementName]: elementValue })
  }
  const handleChangeSelect = async (e: any) => {
    setValue({ ...value, exchange: e.value })
  }
  const handleCreateBot = async () => {
    setLoading(true)
    const result = await createBots(value)
    if (result?.data) {
      setLoading(false)
      await handleChangeFetchingMyBots()
      setOpen(false)
      Swal.fire({
        showConfirmButton: false,
        timer: 1500,
        title: result.message,
        icon: "success",
      })
    } else {
      setLoading(false)
      setOpen(false)
      Swal.fire({
        icon: "error",
        title: result.message,
      })
    }
  }

  const handleChangeFetchingMyBots = async () => {
    getListBots(paging, setBotList)
  }

  const label = { justifyContent: isMobileOnly ? "flex-start" : "flex-end" }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        New Indicator
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Component col={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Name</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent>
                <TextFieldName
                  fullWidth
                  size="small"
                  type="text"
                  variant="outlined"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Detail</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent>
                <TextFieldName
                  fullWidth
                  multiline
                  variant="outlined"
                  minRows={3}
                  maxRows={3}
                  type="text"
                  name="description"
                  value={value.description}
                  onChange={handleChange}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} lg={2}>
              <BoxHeader style={label}>Exchange</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <SelectBase
                className="basic-single"
                classNamePrefix="select"
                value={exchanges.find((ex) => ex.value === value.exchange)}
                isSearchable
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                name="exchange"
                onChange={handleChangeSelect}
                options={exchanges}
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
            disabled={value.name === "" || value.description === "" || loading}
            onClick={handleCreateBot}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ background: "#aaa", width: "100%", marginLeft: "0.5rem" }}
            autoFocus
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </BoxFooter>
      </DialogActions>
    </BootstrapDialog>
  )
})

export default CreateOrder
