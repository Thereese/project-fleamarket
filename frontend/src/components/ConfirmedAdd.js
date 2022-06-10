import React from "react";
import { Link } from "react-router-dom";

export const ConfirmedAdd = () => {
  return (
    <>
      <h1>Your flea market has beed added!</h1>
      <Link to="/">Startpage</Link>
      <Link to="/search">Search</Link>
    </>
  );
};
