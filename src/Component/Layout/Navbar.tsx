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
import { coinsState, openSidebar, binanceAssetState } from "../../Recoil/atoms"
import { getAsset, getSymbol } from "../../Recoil/actions/Coin.action"
import { assetState } from "../../Recoil/atoms/coins"
import { isMobileOnly } from "mobile-device-detect"
import { getBinanceAsset } from "../../Recoil/actions/Used-bot.action"

const drawerWidth = isMobileOnly ? 0 : 240

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
  console.log(3)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const navigate = useNavigate()

  const [sidebar, setOpenSidebar] = useRecoilState(openSidebar)
  const setAsset = useSetRecoilState(assetState)
  const setCoins = useSetRecoilState(coinsState)
  const setBinanceAsset = useSetRecoilState(binanceAssetState)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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
      // getAsset(setAsset)
      // getSymbol(setCoins)
      getBinanceAsset(setBinanceAsset)
    }
    fetchData()
  }, [setBinanceAsset])
  
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
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
})

export default Navbar 