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
import { FaFirstOrder, FaRobot, FaRegChartBar } from "react-icons/fa"
import { RiAdminFill, RiDashboardFill, RiFileHistoryLine } from "react-icons/ri"
import { AiFillSetting, AiFillApi } from "react-icons/ai"
import { GiRobotAntennas } from "react-icons/gi"
import { useNavigate } from "react-router-dom"
import { openSidebar } from "../../Recoil/atoms"
import { useRecoilState } from "recoil"
import { AppRoles } from "../../Utils/roles"
import { Collapse } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { isMobileOnly } from "mobile-device-detect"

const role = sessionStorage.getItem("roles") as AppRoles | null

const drawerWidth = isMobileOnly ? "100%" : 240

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
  position: isMobileOnly ? "fixed" : "static",
  left: 0,
  zIndex: 999,
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
const iconGrRobot = <GiRobotAntennas />
const iconOrders = <FaFirstOrder />
const iconHistory = <RiFileHistoryLine />
const iconAdmin = <RiAdminFill />
const iconSetting = <AiFillSetting />
const iconApi = <AiFillApi />
const iconChart = <FaRegChartBar />

const menuAdminList = [
  { path: "/", name: "Dashboard", icon: iconDashboard },
  { path: "/user/chart", name: "Chart", icon: iconChart },
  { path: "/admin/user", name: "Users", icon: iconAdmin },
  { path: "/admin/indicator", name: "Indicators", icon: iconGrRobot },
  { path: "/user/bot", name: "Bot", icon: iconRobot },
  { path: "/user/orders", name: "Orders", icon: iconOrders },
  { path: "/user/history", name: "History", icon: iconHistory },
]

const menuList = [
  { path: "/", name: "Dashboard", icon: iconDashboard },
  { path: "/user/chart", name: "Chart", icon: iconChart },
  { path: "/user/bot", name: "Bot", icon: iconRobot },
  { path: "/user/orders", name: "Orders", icon: iconOrders },
  { path: "/user/history", name: "History", icon: iconHistory },
]

const Sidebar = React.memo(() => {
  console.log(4)

  const theme = useTheme()
  const [collapseSetting, setCollapseSetting] = React.useState(false)

  const navigate = useNavigate()
  const [sidebar, setOpenSidebar] = useRecoilState(openSidebar)

  const handleDrawerClose = () => {
    setOpenSidebar({ open: !sidebar.open })
  }
  const handleLinkPage = (path: string) => {
    navigate(path)
    if (isMobileOnly) setOpenSidebar({ open: false })
  }

  return (
    <Drawer
      sx={{
        background: "#212121",
        transform: isMobileOnly && !sidebar.open ? "translateX(-100%)" : null,
      }}
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
              <ListItem
                button
                key={i}
                onClick={() => handleLinkPage(text.path)}
              >
                <ListItemIcon sx={{ fontSize: 26 }}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))
          : menuList.map((text, i) => (
              <ListItem
                button
                key={i}
                onClick={() => handleLinkPage(text.path)}
              >
                <ListItemIcon sx={{ fontSize: 26 }}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))}

        <ListItem button onClick={() => setCollapseSetting(!collapseSetting)}>
          <ListItemIcon sx={{ fontSize: 26 }}>{iconSetting}</ListItemIcon>
          <ListItemText primary={"Setting"} />
          {collapseSetting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={collapseSetting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              sx={{ pl: sidebar.open ? 4 : 2 }}
              button
              onClick={() => handleLinkPage("/setting-api")}
            >
              <ListItemIcon sx={{ fontSize: 26 }}>{iconApi}</ListItemIcon>
              <ListItemText primary={"Exchange Api"} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
})

export default Sidebar
