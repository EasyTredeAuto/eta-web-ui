import * as React from "react"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { FaFirstOrder, FaRobot } from "react-icons/fa"
import { RiAdminFill, RiDashboardFill, RiFileHistoryLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { openSidebar } from "../../Recoil/atoms"
import { useRecoilState } from "recoil"
import { AppRoles } from "../../Utils/roles"

const role = sessionStorage.getItem("roles") as AppRoles | null

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))
const iconDashboard = <RiDashboardFill />
const iconRobot = <FaRobot />
const iconOrders = <FaFirstOrder />
const iconHistory = <RiFileHistoryLine />
const iconAdmin = <RiAdminFill />

const menuAdminList = [
  { path: "/dashboard/admin", name: "Dashboard", icon: iconDashboard },
  { path: "/manage/user/admin", name: "Users", icon: iconAdmin },
  { path: "/manage/orders/admin", name: "Orders", icon: iconOrders },
  { path: "/manage/orders", name: "System bot", icon: iconRobot },
  { path: "/history/admin", name: "History", icon: iconHistory },
]

const menuList = [
  { path: "/", name: "Dashboard", icon: iconDashboard },
  { path: "/manage/orders", name: "Manage orders", icon: iconOrders },
  { path: "/manage/bot", name: "System bot", icon: iconRobot },
  { path: "/history", name: "History", icon: iconHistory },
]

const Sidebar = React.memo(() => {
  const theme = useTheme()

  const navigate = useNavigate()
  const [sidebar, setOpenSidebar] = useRecoilState(openSidebar)

  const handleDrawerClose = () => {
    setOpenSidebar({ open: false })
  }

  return (
    <Drawer
      sx={{ background: "#212121" }}
      variant="permanent"
      open={sidebar.open}
    >
      <DrawerHeader sx={{ background: "#212121" }}>
        <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {role === "ADMIN"
          ? menuAdminList.map((text, i) => (
              <ListItem button key={i} onClick={() => navigate(text.path)}>
                <ListItemIcon sx={{ fontSize: 26 }}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))
          : menuList.map((text, i) => (
              <ListItem button key={i} onClick={() => navigate(text.path)}>
                <ListItemIcon sx={{ fontSize: 26 }}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))}
      </List>
    </Drawer>
  )
})

export default Sidebar
