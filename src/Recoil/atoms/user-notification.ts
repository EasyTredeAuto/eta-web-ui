import { atom } from "recoil"

export interface notificationDto {
  id: number
  userIds: number
  title: string
  description: string
  reded: boolean
  createdAt: Date
  updatedAt: Date
}

export const notificationsState = atom({
  key: "notificationsState",
  default: [] as notificationDto[],
})
