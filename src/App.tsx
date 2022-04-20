import Login from "./Component/Page/Login"
import Register from "./Component/Page/Register"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

// layout style
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./Component/Layout/Navbar"
import Sidebar from "./Component/Layout/Sidebar"

// main page
import ManageBot from "./Component/Page/Manage-bots"
import ManageUser from "./Component/Page/Users-Management"
import UsedBot from "./Component/Page/Used-bots"
import SettingApi from "./Component/Page/settings/apis"

import Dashboard from "./Component/Page/Dashboard/Dashboard"
import History from "./Component/Page/View-transaction"
import ManageOrder from "./Component/Page/Manage-api-orders"

import AccessDenied from "./Component/Page/AccessDenied"
import NotApiKey from "./Component/Page/NotApiKey"

// recoil
// import { useRecoilValue, useSetRecoilState } from "recoil"

// atom
import { PrivateRoute } from "./Middleware/privateRoute"
import { AppRoles } from "./Utils/roles"
import { PublicRoute } from "./Middleware/publicRoute"
import { useState, useEffect } from "react"
import { isCheckUserApi } from "./Recoil/actions/Api-key.action"

// check device
import { isMobileOnly } from "mobile-device-detect"

const DrawerHeader = styled("div")(({ theme }:any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

function App() {
  const accessToken: string | null = sessionStorage.getItem("accessToken")
  const [isApi, setIsApi] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const api = await isCheckUserApi()
      if (api.data) {
        setIsApi(true)
      }
    }
    fetchData()
  }, [accessToken])
  
  return (
    <BrowserRouter>
      {!accessToken ? (
        <Routes>
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route path="/register" element={<PublicRoute component={Register} />} />
          <Route path="*" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={Dashboard} />} />
        </Routes>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navbar />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: isMobileOnly ? 2 : 3, pt:3, width: isMobileOnly ? "100%" : "auto" }}>
            <DrawerHeader />
            <Routes>
              <Route path="/admin/user" element={<PrivateRoute roles={[AppRoles.ADMIN]} component={ManageUser} />}/>
              <Route path="/admin/indicator" element={<PrivateRoute roles={[AppRoles.ADMIN]} component={ManageBot} />}/>
              <Route path="/dashboard" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={Dashboard} />}/>
              {/* <Route path="/manage/orders" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={isApi ? ManageOrder : NotApiKey} />}/> */}
              <Route path="/user/bot" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={isApi ? UsedBot : NotApiKey} />}/>
              <Route path="/user/history" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={isApi ? History : NotApiKey} />}/>
              <Route path="/user/setting-api" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={SettingApi} />}/>
              <Route path="/login" element={<PublicRoute component={Login} />}/>
              <Route path="/register" element={<PublicRoute component={Login} />}/>
              <Route path="*" element={<AccessDenied />}/>
            </Routes>
          </Box>
        </Box>
      )}
    </BrowserRouter>
  )
}

export default App
