import { Button, Grid } from "@mui/material"
import React from "react"
import { BsQuestionLg } from "react-icons/bs"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  CreateOrUpdateApiKey,
  getApiKey,
} from "../../../../Recoil/actions/Api-key.action"
import { apikeyState, exchangeState } from "../../../../Recoil/atoms"
import { TextFieldName } from "../../../StyledComponent/CustomMaterial.element"
import { InputKeyContainerTwo, SelectBase } from "./styled.css"
import { InputKeyContainer, Label } from "./styled.css"
import { IconButton, Tooltip } from "@mui/material"
import ApiAbout from "./binance-about"
import { isMobileOnly } from "mobile-device-detect"

const ApiSetting = React.memo(() => {
  const [api, setApi] = useRecoilState(apikeyState)
  const exchanges = useRecoilValue(exchangeState)
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setApi({ ...api, [e.target.name]: e.target.value })
  }
  const handleChangeSelect = async (e: any) => {
    setApi({ ...api, exchange: e.value })
  }
  const handleSaveChange = async () => {
    if (!api.edit) {
      setApi({ ...api, edit: true })
    } else {
      setLoading(true)
      await CreateOrUpdateApiKey(api)
      setApi({ ...api, edit: false })
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const factChingApi = async () => {
      setLoading(true)
      await getApiKey(setApi, api.exchange)
      setLoading(false)
    }
    factChingApi()
  }, [api.exchange, setApi])

  const label = { justifyContent: isMobileOnly ? "flex-start" : "flex-end" }
  return isMobileOnly ? (
    <div style={{ width: "100%" }}>
      <Grid container padding={2}>
        <Grid item xs={12} display="flex" direction="row">
          <Label style={label}>Exchange</Label>
          <IconButton
            size="small"
            style={{ marginTop: 15 }}
            onClick={() => setOpen(true)}
          >
            <BsQuestionLg />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <SelectBase
            className="basic-single"
            classNamePrefix="select"
            value={exchanges.find((ex) => ex.value === api.exchange)}
            isSearchable
            name="exchange"
            onChange={handleChangeSelect}
            options={exchanges}
            isDisabled={loading}
            isLoading={loading}
          />
        </Grid>
      </Grid>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Label style={label}>Api key</Label>
          <TextFieldName
            style={{ marginTop: 15 }}
            fullWidth
            type="text"
            placeholder="Api key"
            name="apiKey"
            value={api.apiKey}
            disabled={loading || !api.edit}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Label style={label}>Secret key</Label>
          <TextFieldName
            style={{ marginTop: 15 }}
            fullWidth
            type="password"
            placeholder="Secret key"
            name="secretKey"
            value={api.secretKey}
            disabled={loading || !api.edit}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Button
            style={{ marginTop: 15, marginBottom: 15 }}
            variant="contained"
            fullWidth
            color="success"
            autoFocus
            onClick={handleSaveChange}
            disabled={
              loading ||
              (api.edit && (api.secretKey === "" || api.apiKey === ""))
            }
          >
            {api.edit
              ? "Save"
              : api.secretKey === "" || api.apiKey === ""
              ? "New Api key"
              : "Change Api key"}
          </Button>
        </Grid>
      </Grid>
      <ApiAbout open={open} setOpen={setOpen} />
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <InputKeyContainerTwo>
        <Label>Exchange</Label>
        <SelectBase
          className="basic-single"
          classNamePrefix="select"
          value={exchanges.find((ex) => ex.value === api.exchange)}
          isSearchable
          name="exchange"
          onChange={handleChangeSelect}
          options={exchanges}
          isDisabled={loading}
          isLoading={loading}
        />
        <Tooltip title="How to add api" placement="top">
          <IconButton
            size="small"
            style={{ marginTop: 15 }}
            onClick={() => setOpen(true)}
          >
            <BsQuestionLg />
          </IconButton>
        </Tooltip>
      </InputKeyContainerTwo>
      <InputKeyContainer>
        <Label>Api key</Label>
        <TextFieldName
          size="small"
          fullWidth
          type="text"
          placeholder="Api key"
          name="apiKey"
          value={api.apiKey}
          disabled={loading || !api.edit}
          onChange={handleChange}
        />
      </InputKeyContainer>
      <InputKeyContainer>
        <Label>Secret key</Label>
        <TextFieldName
          size="small"
          fullWidth
          type="password"
          placeholder="Secret key"
          name="secretKey"
          value={api.secretKey}
          disabled={loading || !api.edit}
          onChange={handleChange}
        />
      </InputKeyContainer>
      <Button
        style={{ marginTop: 15, marginBottom: 15 }}
        variant="contained"
        fullWidth
        color="success"
        autoFocus
        onClick={handleSaveChange}
        disabled={
          loading || (api.edit && (api.secretKey === "" || api.apiKey === ""))
        }
      >
        {api.edit
          ? "Save"
          : api.secretKey === "" || api.apiKey === ""
          ? "New Api key"
          : "Change Api key"}
      </Button>
      <ApiAbout open={open} setOpen={setOpen} />
    </div>
  )
})

export default ApiSetting
