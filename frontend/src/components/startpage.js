import React from "react";
import { Link } from "react-router-dom";

export const Startpage = () => {
  return (
    <article className="content-box">
      <div className="btn-box">
        <Link to="/login" className="login-btn">
          <button className="buttonstyle">Log in</button>
        </Link>
        <Link to="/register" className="login-btn">
          <button className="buttonstyle">Register</button>
        </Link>
      </div>
      {/* <h1>IMAGE FIND?</h1> */}
      <section>
        <h2>About Find</h2>
        <p>
          A short text about searching markets. Link to{" "}
          <Link to="/search">searchpage</Link>
        </p>
      </section>
      {/* <h1>IMAGE ADD?</h1> */}
      <section>
        <h2>About Add</h2>
        <p>
          A short text about searching markets. Link to{" "}
          <Link to="/addmarket">add</Link>
        </p>
      </section>
    </article>
  );
};
