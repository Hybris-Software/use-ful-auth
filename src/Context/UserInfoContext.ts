import { createContext } from "react"

export type UserInfoContextProps = {
  userInfo: any
  setUserInfo: (userInfo: any) => void
}

const UserInfoContext = createContext<UserInfoContextProps>({
  userInfo: {},
  setUserInfo: () => {},
})

export default UserInfoContext
