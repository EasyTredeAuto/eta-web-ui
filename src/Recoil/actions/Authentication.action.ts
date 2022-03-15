export const logout = async () => {
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("email")
  sessionStorage.removeItem("id")
  sessionStorage.removeItem("roles")
}
