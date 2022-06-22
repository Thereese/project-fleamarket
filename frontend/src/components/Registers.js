import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { setCookie } from "utils/cookieHelper";
import { API_URL } from "utils/utils";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const accessToken = setCookie("accessToken");

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
        Authorization: accessToken,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    fetch(API_URL("register"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCookie("accessToken", data.accessToken);
          setIsRegistered(true);
        } else {
          setError(data.response);
        }
      });
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <article className="userinput-box">
      <h2>Register</h2>
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
          REGISTER
        </button>
        <div className="user-link">
          <p>Already have an account?</p>
          <p>
            <Link to="/login">Login here!</Link>
          </p>
        </div>
      </form>
    </article>
  );
};
