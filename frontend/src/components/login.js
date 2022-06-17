import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { setCookie } from "utils/cookieHelper";
import { API_URL } from "utils/utils";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    fetch(API_URL("login"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // make login actions
          setCookie("accessToken", data.accessToken);
          setIsLoggedIn(true);
        } else {
          setError("Sorry, this is an invalid username or password");
        }
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/marketlist" />;
  }

  return (
    <article>
      <h1>Sign in</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={onUsernameChange} value={username}></input>
        <label htmlFor="password">Password</label>
        <input type="text" onChange={onPasswordChange} value={password}></input>
        <div className="error">{error}</div>
        <button type="submit" className="buttonstyle">
          Sign in
        </button>
      </form>
      <p>
        Don´t have an account? <Link to="/register">Register here!</Link>
      </p>
    </article>
  );
};

//onSubmit button, sign in user and send to searchpage
//dont have an account? sign up here! (link to register, with routes)
