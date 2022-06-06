import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text"></input>
        <label htmlFor="password">Password</label>
        <input type="text"></input>
        <label htmlFor="confirm password">Confirm password</label>
        <input type="text"></input>
        <button type="submit">Register</button>
      </form>
      <h2>
        When registered. send user directly to<Link to="/search">search</Link>
      </h2>
    </>
  );
};
