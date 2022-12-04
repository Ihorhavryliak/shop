import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from "react";

export const WindowsTopScroll = React.memo(() => {
const pathname = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname])


})
