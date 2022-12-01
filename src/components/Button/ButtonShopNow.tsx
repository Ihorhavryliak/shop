import React from "react"
import { BsArrowRightShort } from "react-icons/bs"

type ButtonShopNowType = {
  link?: string
  color?: string
}

export const ButtonShopNow = React.memo( ({link}: ButtonShopNowType) => {
  return (
    <a href={link} className="btn btn-dark">
    Shop Now <BsArrowRightShort />
  </a>
  )
}
)