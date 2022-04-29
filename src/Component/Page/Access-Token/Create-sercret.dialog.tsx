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
import { TextFieldName } from "../../StyledComponent/CustomMaterial.element"
import { Grid } from "@mui/material"
import {
  accessValueState,
  exchangeState,
  accessPagingState,
  accessDataState,
} from "../../../Recoil/atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import Swal from "sweetalert2"
import { isMobileOnly } from "mobile-device-detect"
import {
  createAccess,
  getAllApiKey,
} from "../../../Recoil/actions/Api-key.action"

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

const CreateOrder = React.memo(({ open, setOpen }: Props) => {
  console.log(1)
  const handleClose = () => {
    setOpen(false)
  }
  const [value, setValue] = useRecoilState(accessValueState)
  const exchanges = useRecoilValue(exchangeState)

  const handleChangeSelect = async (e: any) => {
    setValue({ ...value, exchange: e.value })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementValue = e.target.value
    const elementName = e.target.name
    setValue({ ...value, [elementName]: elementValue })
  }

  const paging = useRecoilValue(accessPagingState)
  const [accessList, setAccess] = useRecoilState(accessDataState)

  const handleCreateBot = async () => {
    const result = await createAccess(value)
    if (result?.data) {
      await handleChangeFetchingAccess()
      setValue({
        exchange: undefined,
        secretKey: "",
        apiKey: "",
      })
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

  const handleChangeFetchingAccess = async () => {
    getAllApiKey(paging, setAccess)
  }

  const label = { justifyContent: isMobileOnly ? "flex-start" : "flex-end" }
  const StyleContent = { width: isMobileOnly ? "100%" : "100%" }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Select Bot
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Component col={"100%"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Exchange:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent style={StyleContent}>
                <SelectBase
                  className="basic-single"
                  classNamePrefix="select"
                  value={exchanges.find((ex) => ex.value === value.exchange)}
                  isSearchable
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  name="exchange"
                  onChange={handleChangeSelect}
                  options={exchanges.filter(
                    (x) =>
                      !accessList.data.map((s) => s.exchange).includes(x.value)
                  )}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Api Key:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent>
                <TextFieldName
                  fullWidth
                  size="small"
                  type="text"
                  variant="outlined"
                  name="apiKey"
                  value={value.apiKey}
                  onChange={handleChange}
                />
              </BoxContent>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <BoxHeader style={label}>Secret Key:</BoxHeader>
            </Grid>
            <Grid item xs={12} sm={8} lg={8}>
              <BoxContent>
                <TextFieldName
                  fullWidth
                  size="small"
                  type="password"
                  variant="outlined"
                  name="secretKey"
                  value={value.secretKey}
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
              value.apiKey === "" || value.secretKey === "" || !value.exchange
            }
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
          >
            Cancel
          </Button>
        </BoxFooter>
      </DialogActions>
    </BootstrapDialog>
  )
})

export default CreateOrder
