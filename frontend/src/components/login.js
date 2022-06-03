import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <h1>Form for sign in</h1>
      <p>
        onclick login, send user to <Link to="/search">searchpage</Link>
      </p>
      <h2 className="registerlink">
        Don´t have an account? <Link to="/register">Register here!</Link>
      </h2>
    </>
  );
};
//dont have an account? sign up here! (link to register, with routes)
