import React from "react"
import Home from "../components/Home/Home"
import Auth from "../components/Auth/Auth"
import { LOGIN_ROUTE, HOME_ROUTE, ADMIN_ROUTE } from "./routerPath"
import Admin from "../components/Admin/Admin"

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: <Home />
  },
  {
    path: ADMIN_ROUTE,
    Component: <Admin />
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth />
  },
]