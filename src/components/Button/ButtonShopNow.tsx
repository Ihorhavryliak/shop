import React from "react"
import { BsArrowRightShort } from "react-icons/bs"
import { NavLink } from "react-router-dom"

type ButtonShopNowType = {
  link: string
  color?: string
}

export const ButtonShopNow = React.memo( ({link}: ButtonShopNowType) => {
  return (
    <NavLink to={link} className="btn btn-dark">
    Shop Now <BsArrowRightShort />
  </NavLink>
  )
}
)