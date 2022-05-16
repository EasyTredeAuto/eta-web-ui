import React, { memo } from "react"
import { BoxContent } from "../StyledComponent/Dashboard.Element"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

const NotPermission = memo(() => {
  const navigate = useNavigate()

  return (
    <BoxContent>
      <h1>Not Permission</h1>
      <h4>Please define api for system usage.</h4>
      <Button
        variant="contained"
        color="primary"
        autoFocus
        onClick={() => navigate("/user/access-token")}
      >
        Setting Api
      </Button>
    </BoxContent>
  )
})
export default NotPermission
