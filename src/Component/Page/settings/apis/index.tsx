import React from "react"
import { Container, Layout } from "./styled.css"
import ApiSetting from "./api-setting"
import { isMobileOnly } from "mobile-device-detect"

const Settings = React.memo(() => {
  return (
    <Container>
      <Layout style={{ width: isMobileOnly ? "100%" : "50%" }}>
        <ApiSetting />
      </Layout>
    </Container>
  )
})
export default Settings
