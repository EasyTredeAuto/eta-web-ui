import Login from "./Component/Page/Login"
import Register from "./Component/Page/Register"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// layout style
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./Component/Layout/Navbar"
import Sidebar from "./Component/Layout/Sidebar"

// main page
import Dashboard from "./Component/Page/Dashboard/Dashboard"
import History from "./Component/Page/History/History"
import ManageBot from "./Component/Page/ManageBot/ManageOrder"
import AccessDenied from "./Component/Page/AccessDenied"

// recoil
// import { useRecoilValue, useSetRecoilState } from "recoil"

// atom
import { PrivateRoute } from "./Middleware/privateRoute"
import { AppRoles } from "./Utils/roles"
import { PublicRoute } from "./Middleware/publicRoute"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

function App() {
  const accessToken: string | null = sessionStorage.getItem("accessToken")

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
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={Dashboard} />}/>
              <Route path="/bot" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={ManageBot} />}/>
              <Route path="/history" element={<PrivateRoute roles={[AppRoles.ADMIN, AppRoles.AUTHOR]} component={History} />}/>
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
