import * as ajax from "../../Utils/ajax"

export const logout = async () => {
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("email")
  sessionStorage.removeItem("id")
  sessionStorage.removeItem("roles")
}

export const approveEmail = (token: string) => {
  return ajax
    .get(`/auth/confirm/${token}`)
    .then((result: any) => result)
    .catch((err: any) => console.log(err))
}
