import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { setCookie } from "utils/cookieHelper";
import { API_URL } from "utils/utils";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

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
          setCookie("accessToken", data.accessToken);
          setIsLoggedIn(true);
        } else {
          setError("Sorry, this is an invalid username or password");
        }
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/addmarket" />;
  }

  return (
    <article className="userinput-box">
      <h2>Sign in</h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={onUsernameChange} value={username}></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="password"
          onChange={onPasswordChange}
          value={password}
        ></input>
        <div className="error">{error}</div>
        <button type="submit" className="buttonstyle">
          SIGN IN
        </button>
      </form>
      <div className="user-link">
        <p>Don´t have an account?</p>
        <p>
          <Link to="/register">Register here!</Link>
        </p>
      </div>
    </article>
  );
};
