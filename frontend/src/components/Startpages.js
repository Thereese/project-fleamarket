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
      <section className="about-box">
        <img src="https://via.placeholder.com/80" alt="image of find" />
        <h2>About Find</h2>
        <p>
          A short text about searching markets.
          <Link to="/marketlist">searchpage</Link>
        </p>
      </section>
      <section className="about-box">
        <img src="https://via.placeholder.com/80" alt="image of add" />
        <h2>About Add</h2>
        <p>
          A short text about searching markets.
          <Link to="/addmarket">add</Link>
        </p>
      </section>
    </article>
  );
};
