import * as ajax from "../../Utils/ajax"

export const setRememberOption = async (
  email: string | undefined,
  password: string | undefined
) => {
  if (email && password) {
    sessionStorage.setItem("email", email)
    sessionStorage.setItem("password", password)
  } else {
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("password")
  }
}

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
