import React from "react"
import { Link } from "react-router-dom"
import { setCookie } from "../utils/cookieHelper"
import Sidebar from "./Sidebar"

export const Navbar = () => {
  return (
    <header>
      <h1>LOGO:</h1>
      {/* <Sidebar /> */}
      {/* <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/" onClick={setCookie("accessToken", null)}>

          new page
          
            Sign out
          </Link>
        </li>
      </ul> */}
    </header>
  )
}
