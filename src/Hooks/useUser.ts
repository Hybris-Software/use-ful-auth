// React
import { useContext } from "react"

// Hooks
import useQuery from "@hybrissoftware/use-ful-query"

// Contexts
import UserInfoContext from "../Context/UserInfoContext"
import AuthProviderContext from "../Context/AuthProviderContext"

const useUser = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext)
  const authUrl = useContext(AuthProviderContext)

  const userInfoQuery = useQuery({
    url: authUrl,
    method: "GET",
    executeImmediately: false,
    onSuccess: (response: any) => {
      setUserInfo(response.data)
    },
    onUnauthorized: (error: any) => {
      setUserInfo({})
    },
  })

  const refreshUserInfo = () => {
    userInfoQuery.executeQuery()
  }

  return { userInfo, refreshUserInfo }
}

export default useUser
