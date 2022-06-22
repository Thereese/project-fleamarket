import React from "react";
import { Link } from "react-router-dom";
import image from "../img/blockimg.jpg";

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
        <Link
          to="/marketlist"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>Find one!</h2>
          <h3>Looking for flea markets?</h3>
          <h3>
            Here you can search for them, maybe you have one just around the
            corner!
          </h3>
        </Link>
        <Link
          to="/login"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>Add one!</h2>
          <h3>Planning to have your own flea market?</h3>
          <h3>Log in and add it so people can find it and visit!</h3>
        </Link>
      </section>
    </article>
  );
};
