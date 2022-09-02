import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import AccessDenied from "../Component/Page/AccessDenied"
import { AppRoles } from "../Utils/roles"

interface Props {
  path?: string
  roles: Array<AppRoles>, 
  children: ReactElement<any, any> | null
}

export const PrivateRoute: React.FC<Props> = ({
  roles,
  children
}) => {
  const accessToken: string | null = sessionStorage.getItem("accessToken")
  const userId = sessionStorage.getItem("id")
  const role = sessionStorage.getItem("roles") as AppRoles
  const isAuthenticated: boolean = accessToken ? true : false
  const userHasRequiredRole = userId && roles.includes(role) ? true : false

  if (isAuthenticated && userHasRequiredRole) {
    return children
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />
  }

  return <Navigate to="/login" />
}
