import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { setCookie } from "utils/cookieHelper";

export default (props) => {
  return (
    <>
      <Menu>
        <a className="menu-item" href="/">
          Home
        </a>
        <a className="menu-item" href="/about">
          About
        </a>
        <a className="menu-item" href="/logout">
          Sign out
        </a>
      </Menu>
      <Link to="/about" className="login-btn">
        <button className="firstpage-btn">about</button>
      </Link>
    </>
  );
};
