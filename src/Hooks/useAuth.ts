import { useState, useEffect, useContext } from "react"

// Hooks
import useQuery from "@hybrissoftware/use-ful-query"

// Contexts
import UserInfoContext from "../Context/UserInfoContext"

export type UseAuthProps = {
  url: string
  method?: string
  executeImmediately?: boolean
  onSuccess?: (response: any) => void
  onUnauthorized?: (error: any) => void
  onError?: (error: any) => void
}

const useAuth = ({
  url,
  method = "GET",
  executeImmediately = true,
  onSuccess = () => {},
  onUnauthorized = () => {},
  onError = () => {},
}: UseAuthProps) => {
  const { setUserInfo } = useContext(UserInfoContext)
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined)
  const { isLoading, isError, isSuccess, data, error, executeQuery } = useQuery(
    {
      url: url,
      method: method,
      executeImmediately: false,
      onSuccess: (response: any) => {
        setIsLogged(true)
        setUserInfo(response.data)
        onSuccess(response)
      },
      onUnauthorized: (error: any) => {
        localStorage.removeItem("token")
        setIsLogged(false)
        onUnauthorized(error)
      },
      onError: (error: any) => {
        setIsLogged(false)
        onError(error)
      },
    }
  )

  useEffect(() => {
    if (executeImmediately) {
      executeQuery()
    }
  }, [])

  return {
    isLogged: isLogged,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    data: data,
    error: error,
    executeQuery: executeQuery,
  }
}

export default useAuth
