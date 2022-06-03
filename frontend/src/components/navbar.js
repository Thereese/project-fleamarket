import { React } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header>
      <h1>LOGO: Finding Fleamarkets</h1>
      <h2>Hamburgermenu</h2>
      <h2>
        <Link to="/">Sign out</Link>
      </h2>
    </header>
  );
};
