import React from "react";
import { Link } from "react-router-dom";

export const ConfirmedAdd = () => {
  return (
    <>
      <h1>Your flea market has beed added!</h1>
      <h2>Good luck and have fun!</h2>
      <Link to="/marketlist">
        <button className="buttonstyle">Find more markets</button>
      </Link>
    </>
  );
};
