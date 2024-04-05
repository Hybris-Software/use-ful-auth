import React from "react"

// Styles
import Style from "./LoaderGlobal.module.css"

// Loader
import { TailSpin } from "react-loading-icons"

const LoaderGlobal = () => {
  return (
    <div className={Style.globalLoader}>
      <TailSpin stroke="black" />
    </div>
  )
}

export default LoaderGlobal
