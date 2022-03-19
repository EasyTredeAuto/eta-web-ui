import React from "react"
import { Container, Layout } from "./styled.css"
import ApiSetting from "./api-setting"

const Settings = React.memo(() => {
  return (
    <Container>
      <Layout>
        <ApiSetting />
      </Layout>
    </Container>
  )
})
export default Settings
