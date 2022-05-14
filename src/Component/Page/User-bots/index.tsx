/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react"
import { styled, alpha } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { BsPlusCircleFill } from "react-icons/bs"
import {
  BoxContent,
  BoxSearch,
  Component,
} from "../../StyledComponent/OrdersComponent.Element"
import ListBot from "./Bots-table"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import CreateBot from "./Create-bot.dialog"
import { botUserPagingState } from "../../../Recoil/atoms"
import { useRecoilState } from "recoil"
import { isMobileOnly } from "mobile-device-detect"

const Search = styled("div")(({ theme }: any) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }: any) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }: any) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  "& .MuiInputBase-root": {
    border: "1px sold #333",
    borderRadius: "5px",
  },
}))

const BotsComponent = memo(() => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const [paging, setPaging] = useRecoilState(botUserPagingState)
  const [debouncedTerm, setDebouncedTerm] = useState(paging.search)

  // update 'term' value after 1 second from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(
      () => setPaging({ ...paging, search: debouncedTerm }),
      1000
    )
    return () => clearTimeout(timer)
  }, [debouncedTerm])

  const handleSearch = async (e: any) => {
    setDebouncedTerm(e.target.value)
  }

  return (
    <Component col={"100%"}>
      <Component col={isMobileOnly ? "1fr" :"15% 85%"}>
        <Button
          variant="contained"
          endIcon={<BsPlusCircleFill />}
          onClick={handleClickOpen}
        >
          Add Indicator
        </Button>
        <BoxSearch>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <div
              style={{
                border: "1px solid #4444",
                borderRadius: "5px",
                marginRight: isMobileOnly ? 0 : "1rem",
              }}
            >
              <StyledInputBase
                id="search"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </div>
          </Search>
        </BoxSearch>
      </Component>
      <BoxContent>
        <ListBot />
      </BoxContent>
      <CreateBot open={open} setOpen={setOpen} />
    </Component>
  )
})

export default BotsComponent
