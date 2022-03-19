import { Button } from "@mui/material"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  CreateOrUpdateApiKey,
  getApiKey,
} from "../../../Recoil/actions/Api-key.action"
import { apikeyState, exchangeState } from "../../../Recoil/atoms"
import { TextFieldName } from "../../StyledComponent/CustomMaterial.element"
import { SelectBase } from "./styled.css"
import { InputKeyContainer, Label } from "./styled.css"

const ApiSetting = React.memo(() => {
  const [api, setApi] = useRecoilState(apikeyState)
  const exchanges = useRecoilValue(exchangeState)
  const [loading, setLoading] = React.useState(false)

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
      const resu = await CreateOrUpdateApiKey(api)
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

  return (
    <div style={{ width: "100%" }}>
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
      <InputKeyContainer>
        <Label>Api key</Label>
        <TextFieldName
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
    </div>
  )
})

export default ApiSetting
