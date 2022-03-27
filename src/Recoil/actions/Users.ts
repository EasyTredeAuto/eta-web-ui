import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { userListValueDto } from "../atoms/users"

export const getUserList = async (
  paging: {
    page: number
    size: number
    search: string
  },
  setUserList: SetterOrUpdater<{ count: number; data: userListValueDto[] }>
) => {
  const result = await ajax
    .get(`/user/${paging.page}/${paging.size}?search=${paging.search}`)
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result?.data) {
    setUserList({ count: result.count, data: result.data })
  }
}