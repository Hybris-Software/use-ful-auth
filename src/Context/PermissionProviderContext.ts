import { createContext } from "react"

export type PermissionProviderContextProps = [
  boolean,
  (permission: boolean) => void,
]

const PermissionProviderContext = createContext<PermissionProviderContextProps>(
  [false, () => {}]
)

export default PermissionProviderContext
