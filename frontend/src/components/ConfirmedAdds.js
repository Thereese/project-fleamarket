import React from "react";
import { Link } from "react-router-dom";

export const ConfirmedAdd = () => {
  return (
    <>
      <h1>Your flea market has beed added!</h1>
      <p>
        Back to <Link to="/marketlist">searchpage</Link>
      </p>
    </>
  );
};
