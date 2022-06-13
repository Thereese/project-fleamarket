import React from "react";
import { Link } from "react-router-dom";
import { setCookie } from "utils/cookieHelper";

export const Navbar = () => {
  return (
    <header>
      <h1>LOGO: Finding Fleamarkets</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/" onClick={setCookie("accessToken", null)}>
            Sign out
          </Link>
        </li>
      </ul>
    </header>
  );
};
