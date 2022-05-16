import { atom } from "recoil"

export interface LineProfileDto {
  displayName: string | undefined
  pictureUrl: string | undefined
  userId: string | undefined
  idToken: string | null
}

export const lineProfileState = atom({
  key: "lineProfileState",
  default: {
    displayName: undefined,
    pictureUrl: undefined,
    userId: undefined,
    idToken: null,
  } as LineProfileDto,
})