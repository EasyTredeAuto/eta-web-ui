import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Badge from "@mui/material/Badge"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { Menu, MenuItem } from "@mui/material"
import { logout } from "../../Recoil/actions/Authentication.action"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  openSidebar,
  binanceAssetState,
  listAdminState,
  notificationsState,
} from "../../Recoil/atoms"
import { isMobileOnly } from "mobile-device-detect"
import { getBinanceAsset } from "../../Recoil/actions/User-bot.action"
import { AppRoles } from "../../Utils/roles"
import {
  getAllNoti,
  readNotification,
} from "../../Recoil/actions/User-notification.action"
import { BoxNotification } from "../StyledComponent/Notification.style"
import moment from "moment"
import { BiTime } from "react-icons/bi"
// import DialogConfigLine from "../Dialog/LineConfig"

const drawerWidth = isMobileOnly ? 0 : 200
const ITEM_HEIGHT = 50

const role = sessionStorage.getItem("roles") as AppRoles | null

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<AppBarProps>(({ theme, open }: any) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Navbar = React.memo(() => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  // const [dialogLine, setShowDialogLine] = React.useState(false)

  // notification
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()

  const [sidebar, setOpenSidebar] = useRecoilState(openSidebar)
  const [notifications, setNotifications] = useRecoilState(notificationsState)
  const setBinanceAsset = useSetRecoilState(binanceAssetState)
  const [listAdmin, setListAdmin] = useRecoilState(listAdminState)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleSetUserPage = () => {
    setListAdmin(!listAdmin)
    listAdmin ? navigate("/user/dashboard") : navigate("/admin/user")
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // const handleShowDialogLine = () => {
  //   setShowDialogLine(true)
  //   setAnchorElUser(null)
  // }

  const handleLogout = async () => {
    await logout()
    navigate("/login")
    window.location.reload()
  }

  const handleDrawerOpen = () => {
    setOpenSidebar({ open: !sidebar.open })
  }

  const menuId = "primary-search-account-menu"

  React.useEffect(() => {
    function fetchData() {
      getBinanceAsset(setBinanceAsset)
    }
    fetchData()
  }, [setBinanceAsset])

  React.useEffect(() => {
    const timer = setInterval(() => getAllNoti(setNotifications), 60000)
    return () => clearInterval(timer)
  })

  const handleReadNotification = (id: number) => {
    readNotification(id).then(() => getAllNoti(setNotifications))
  }

  const notiNotReded = notifications.filter((x) => !x.reded).length

  return (
    <AppBar position="fixed" open={sidebar.open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "#212121",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: "36px",
            ...(sidebar.open && !isMobileOnly && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Easy Trade Auto
        </Typography>
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            id="long-button"
            onClick={handleClick}
          >
            <Badge badgeContent={notiNotReded} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 6,
              },
            }}
          >
            {notifications.map((option, i) => (
              <MenuItem
                key={i}
                style={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  background: option.reded ? "#eee" : "#fff",
                }}
                onClick={() => handleReadNotification(option.id)}
              >
                <BoxNotification>
                  <p>{option.title}</p>
                  <p>{option.description}</p>
                  <p>
                    <BiTime />{" "}
                    {moment(option.createdAt).format("DD-MM-YYYY HH:mm")}
                  </p>
                  <hr />
                </BoxNotification>
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            {/* <MenuItem onClick={handleShowDialogLine}>
              <Typography textAlign="center">Line Config</Typography>
            </MenuItem> */}
            {role === "ADMIN" && (
              <MenuItem onClick={handleSetUserPage}>
                <Typography textAlign="center">
                  Switch to {listAdmin ? "user" : "admin"}
                </Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      {/* <DialogConfigLine open={dialogLine} setOpen={setShowDialogLine} /> */}
    </AppBar>
  )
})

export default Navbar
