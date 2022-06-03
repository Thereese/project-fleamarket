import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <h1>Register</h1>;
      <h2>
        When registered. send user directly to<Link to="/search">search</Link>
      </h2>
    </>
  );
};
