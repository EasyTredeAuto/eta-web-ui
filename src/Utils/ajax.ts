import axios from "axios"
import { LoginDto } from "../Recoil/atoms/auth"

const baseUrl = "http://159.223.65.62:8000"
const accessToken = sessionStorage.getItem("accessToken")

export const login = async (user: LoginDto) => {
  const url = `http://159.223.65.62:8000/auth/login`
  const headers = { "Content-Type": "application/json" }
  const result = await axios
    .post(url, user, { headers })
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
export const register = async (user: LoginDto) => {
  const url = `${baseUrl}/auth/register`
  const headers = { "Content-Type": "application/json" }
  const result = await axios
    .post(url, user, { headers })
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

export const get = async (path: string) => {
  const url = `${baseUrl}${path}`
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  }
  return await axios
    .get(url, { headers })
    .then((result) => result.data)
    .catch((err) => err)
}

export const post = async (path: string, body: any) => {
  const url = `${baseUrl}${path}`
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  }
  return await axios
    .post(url, body, { headers })
    .then((result) => result.data)
    .catch((err) => err)
}

export const put = async (path: string, body: any) => {
  const url = `${baseUrl}${path}`
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  }
  return await axios
    .put(url, body, { headers })
    .then((result) => result.data)
    .catch((err) => err)
}

export const remove = async (path: string) => {
  const url = `${baseUrl}${path}`
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  }
  return await axios
    .delete(url, { headers })
    .then((result) => result.data)
    .catch((err) => err)
}
