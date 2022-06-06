import React from "react";
import { Link } from "react-router-dom";

export const Startpage = () => {
  return (
    <section>
      <h2>
        <Link to="/login">Log in</Link>
      </h2>
      <p className="registerlink">
        Don´t have an account? <Link to="/register">Register here!</Link>
      </p>
      <h1>IMAGE FIND?</h1>
      <section>
        <h2>About Find</h2>
        <p>
          A short text about searching markets. Link to{" "}
          <Link to="/search">searchpage</Link>
        </p>
      </section>
      <h1>IMAGE ADD?</h1>
      <section>
        <h2>About Add</h2>
        <p>
          A short text about searching markets. Link to{" "}
          <Link to="/register">add</Link>
        </p>
      </section>
    </section>
  );
};
