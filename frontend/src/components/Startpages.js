import React from "react";
import { Link } from "react-router-dom";

export const Startpage = () => {
  return (
    <article className="content-box">
      <div className="btn-box">
        <Link to="/login" className="login-btn">
          <button className="firstpage-btn">LOG IN</button>
        </Link>
        <Link to="/register" className="login-btn">
          <button className="firstpage-btn">REGISTER</button>
        </Link>
      </div>
      <section className="about-box">
        <Link to="/marketlist">
          {/* <img src="https://via.placeholder.com/80" alt="image of find" /> */}
          <h2>Find one!</h2>
          <p>
            Looking for flea markets? Here you can search for them, maybe you
            have one just around the corner!
          </p>
        </Link>
      </section>
      <section className="about-box">
        <Link to="/addmarket">
          {/* <img src="https://via.placeholder.com/80" alt="image of add" /> */}
          <h2>Add one!</h2>
          <p>
            Planning to have your own flea market? Log in and add it here so
            people can find it and visit!
          </p>
        </Link>
      </section>
    </article>
  );
};
