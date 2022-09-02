import { ReactElement } from "react"
import { Navigate } from "react-router-dom"

interface Props {
  path?: string,
  children: ReactElement<any, any> | null
}

export const PublicRoute: React.FC<Props> = ({ children }) => {
  const accessToken: string | null = sessionStorage.getItem("accessToken")
  const isAuthenticated: boolean = accessToken ? true : false

  if (!isAuthenticated) {
    return children
  }

  return <Navigate to="/" />
}
