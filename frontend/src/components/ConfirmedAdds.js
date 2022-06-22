import React from "react";
import { Link } from "react-router-dom";

export const ConfirmedAdd = () => {
  return (
    <>
      <h2>Your flea market has beed added!</h2>
      <h3>Good luck and have fun!</h3>
      <Link to="/marketlist">
        <button className="buttonstyle">Find more markets</button>
      </Link>
    </>
  );
};
