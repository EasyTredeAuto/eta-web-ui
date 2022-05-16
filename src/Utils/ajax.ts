import axios from "axios"
import { LoginDto } from "../Recoil/atoms/auth"
import { LineProfileDto } from "../Recoil/atoms/todo-line"

const baseUrl = process.env.REACT_APP_BASE_URL
const accessToken = sessionStorage.getItem("accessToken")
const authFailedMessage = "Request failed with status code 401"
const headerFirstAuth = { "Content-Type": "application/json" }
const headerIsAuth = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + accessToken,
}

export const login = async (user: LoginDto) => {
  const url = `${baseUrl}/auth/login`
  const result = await axios
    .post(url, user, { headers: headerFirstAuth })
    .then((result) => result.data)
    .catch((err) => err)

  if (result.data) {
    const accessToken = result.data.accessToken
    const { id, email, roles } = result.data.user
    sessionStorage.setItem("accessToken", accessToken)
    sessionStorage.setItem("email", email)
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("roles", roles)
    return result.data.user
  } else return result
}

export const lineLogin = async (lineBody: LineProfileDto) => {
  const url = `${baseUrl}/auth/line/login`
  const result = await axios
    .post(url, lineBody, { headers: headerFirstAuth })
    .then((result) => result.data)
    .catch((err) => err)

  if (result.data) {
    const accessToken = result.data.accessToken
    const { id, roles, lineId } = result.data.user
    sessionStorage.setItem("accessToken", accessToken)
    sessionStorage.setItem("lineId", lineId)
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("roles", roles)
    return result.data.user
  } else return result
}

export const register = async (user: LoginDto) => {
  const url = `${baseUrl}/auth/register`
  const result = await axios
    .post(url, user, { headers: headerFirstAuth })
    .then((result) => result.data)
    .catch((err) => err)

  if (result?.data) {
    // const accessToken = result.data.accessToken
    // const { id, email, roles } = result.data.user
    // sessionStorage.setItem("accessToken", accessToken)
    // sessionStorage.setItem("email", email)
    // sessionStorage.setItem("id", id)
    // sessionStorage.setItem("roles", roles)
    // return result.data.user
    return result
  } else return result
}

export const approveEmail = (token: string) => {
  const url = `${baseUrl}/auth/confirm/${token}`

  return axios
    .get(url)
    .then((result: any) => result.data)
    .catch((err: any) => console.log(err))
}

export const get = async (path: string) => {
  const url = `${baseUrl}${path}`
  const res = await axios
    .get(url, { headers: headerIsAuth })
    .then((result) => result.data)
    .catch((err) => err)

  if (res?.message === authFailedMessage) isNotUser()
  else return res
}

export const post = async (path: string, body: any) => {
  const url = `${baseUrl}${path}`
  const res = await axios
    .post(url, body, { headers: headerIsAuth })
    .then((result) => result.data)
    .catch((err) => err)

  if (res?.message === authFailedMessage) isNotUser()
  else return res
}

export const put = async (path: string, body?: any) => {
  const url = `${baseUrl}${path}`
  const res = await axios
    .put(url, body, { headers: headerIsAuth })
    .then((result) => result.data)
    .catch((err) => err)
  if (res?.message === authFailedMessage) isNotUser()
  else return res
}

export const remove = async (path: string) => {
  const url = `${baseUrl}${path}`
  const res = await axios
    .delete(url, { headers: headerIsAuth })
    .then((result) => result.data)
    .catch((err) => err)
  if (res?.message === authFailedMessage) isNotUser()
  else return res
}

const isNotUser = () => {
  console.log("isNotUser")
  // sessionStorage.removeItem("accessToken")
  // sessionStorage.removeItem("email")
  // sessionStorage.removeItem("id")
  // sessionStorage.removeItem("roles")
}
