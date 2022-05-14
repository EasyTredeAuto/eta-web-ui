/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Select from "react-select"
import { BsPlusCircleFill } from "react-icons/bs"
import {
  BoxContent,
  BoxSearch,
  Component,
} from "../../StyledComponent/OrdersComponent.Element"
import ListBot from "./Access-Table"
import CreateBot from "./Create-sercret.dialog"
import { Grid } from "@mui/material"
import * as Atoms from "../../../Recoil/atoms"
import { useRecoilState } from "recoil"
import { getAllSchedule } from "../../../Recoil/actions/Admin-schedule-access"

const AccessToken = memo(() => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const [paging, setPaging] = useRecoilState(
    Atoms.botScheduledAccessPagingState
  )
  const [value, setValue] = useRecoilState(Atoms.accessBotValueState)
  const [botUserList, setBotUserList] = useRecoilState(
    Atoms.scheduleListDataState
  )
  const [option, setBotOption] = useRecoilState(Atoms.scheduleOptionDataState)

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
    if (e) {
      setPaging({ ...paging, userIds: e.value })
      setValue({ ...value, userIds: e.value })
    } else {
      setPaging({ ...paging, userIds: null })
      setValue({ ...value, userIds: null })
    }
  }

  return (
    <Component col={"100%"}>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            disabled={!paging.userIds}
            variant="contained"
            endIcon={<BsPlusCircleFill />}
            onClick={handleClickOpen}
          >
            Add Token
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <BoxSearch>
            <Select
              id="select-bot-access"
              options={option}
              value={option.find((x) => x.value === value.userIds)}
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
