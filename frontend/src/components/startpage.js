import React from "react";
import { Link } from "react-router-dom";

export const Startpage = () => {
  return (
    <>
      <h1>Startpage..</h1>
      <h2>
        <Link to="/login">Log in</Link>
      </h2>
    </>
  );
};
