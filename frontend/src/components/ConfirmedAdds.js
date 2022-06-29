import React from "react";
import { Link } from "react-router-dom";
import image from "../img/blockimg.jpg";

export const ConfirmedAdd = () => {
  return (
    <article>
      <div
        className="addmarket-box"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2>Your flea market has beed added!</h2>
        <h3>Good luck! And have fun!</h3>
      </div>
      <div className="addmarket-links">
        <Link to="/marketlist">
          <button className="firstpage-btn">FIND MORE MARKETS</button>
        </Link>
        <Link to="/logout">
          <button className="firstpage-btn">LOG OUT</button>
        </Link>
      </div>
    </article>
  );
};
