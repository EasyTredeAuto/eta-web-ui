/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react"
import { styled, alpha } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Select from "react-select"
import { BsPlusCircleFill } from "react-icons/bs"
import {
  BoxContent,
  BoxSearch,
  Component,
} from "../../StyledComponent/OrdersComponent.Element"
import ListBot from "./Access-Table"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import CreateBot from "./Create-sercret.dialog"
import {
  botScheduledAccessPagingState,
  scheduleListDataState,
} from "../../../Recoil/atoms"
import { useRecoilState } from "recoil"
import { isMobileOnly } from "mobile-device-detect"
import { getAllSchedule } from "../../../Recoil/actions/Admin-schedule-access"
import { scheduleOptionDataState } from "../../../Recoil/atoms/admin-secret-bot"
import { Grid } from "@mui/material"

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

const AccessToken = memo(() => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const [paging, setPaging] = useRecoilState(botScheduledAccessPagingState)
  const [debouncedTerm, setDebouncedTerm] = useState(paging.search)
  const [botUserList, setBotUserList] = useRecoilState(scheduleListDataState)
  const [option, setBotOption] = useRecoilState(scheduleOptionDataState)

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

  // option
  useEffect(() => {
    const fetchData = async () => {
      await getAllSchedule(setBotUserList)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      let data = []
      for (const ub of botUserList) {
        data.push({ value: ub.id, label: ub.email })
      }
      setBotOption(data)
    }
    fetchData()
  }, [botUserList])

  const handleChangeSchedule = (e: any) => {
    if (e) setPaging({ ...paging, userIds: e.value })
    else setPaging({ ...paging, userIds: null })
  }

  return (
    <Component col={"100%"}>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<BsPlusCircleFill />}
            onClick={handleClickOpen}
          >
            Add Token
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={2}>
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
        </Grid>
        <Grid item xs={12} sm={2}>
          <BoxSearch>
            <Select
              id="select-bot-access"
              options={option}
              // value={option.find((x) => x.value === paging.exchange)}
              onChange={handleChangeSchedule}
              isClearable
              isSearchable
              placeholder="Schedule Name"
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </BoxSearch>
        </Grid>
      </Grid>
      <BoxContent>
        <ListBot />
      </BoxContent>
      <CreateBot open={open} setOpen={setOpen} />
    </Component>
  )
})

export default AccessToken
