import { SetterOrUpdater } from "recoil"
import * as ajax from "../../Utils/ajax"
import { notificationDto } from "../atoms/user-notification"

export const getAllNoti = async (
  setNotifications: SetterOrUpdater<notificationDto[]>
) => {
  const result = await ajax
    .get("/notification")
    .then((result) => result)
    .catch((err) => console.log(err))

  if (result.data) {
    const data = result.data
    setNotifications(data)
  }
}

export const readNotification = (id: number) => {
  return ajax
    .put(`/notification/${id}`)
    .then((result) => result)
    .catch((err) => console.log(err))
}
