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
    <>
      <h1>Register</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={onUsernameChange} value={username}></input>
        <label htmlFor="password">Password</label>
        <input type="text" onChange={onPasswordChange} value={password}></input>
        {/* <label htmlFor="confirm password">Confirm password</label>
        <input type="text"></input> */}
        <div>{error}</div>
        <button type="submit" className="buttonstyle">
          REGISTER
        </button>
        <p>
          Already have an account? <Link to="/login">Login here!</Link>
        </p>
      </form>
    </>
  );
};
