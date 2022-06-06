import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  // const navigate = useNavigate();
  // const navigateToRegister = () => {
  //   navigate("/register");
  // };
  return (
    <>
      <h1>Sign in</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text"></input>
        <label htmlFor="password">Password</label>
        <input type="text"></input>
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don´t have an account? <Link to="/register">Register here!</Link>
      </p>
    </>
  );
};
//onSubmit button, sign in user and send to searchpage
//dont have an account? sign up here! (link to register, with routes)
