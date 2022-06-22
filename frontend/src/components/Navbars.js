import React from "react";
import { Link } from "react-router-dom";
import { setCookie } from "utils/cookieHelper";

export const Navbar = () => {
  return (
    <header>
      <h1>Find a Fleamarket</h1>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </header>
  );
};
