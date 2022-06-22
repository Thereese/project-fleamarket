import React from "react";
import { Link } from "react-router-dom";
import image from "../img/blockimg.jpg";

export const About = () => {
  return (
    <article
      className="aboutpage-box"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h2>About "Finding Fleamarkets"</h2>
      <p>
        More and more people understand not only the importance of living in a
        more sustainable way but also what responsibility we have to take care
        of this planet and all it´s inhabitants.
      </p>
      <p>
        One way of approaching this is to change our consumer behaviuor to a
        more circular one.
      </p>
      <p>
        Flea markets are a great way of both selling and buying pre-loved
        things. With this app I wan´t to make it easier to search for markets
        and to add your own.
      </p>
      <p>Hope you enjoy it!</p>
      <p>Therese</p>
      <Link to="/">
        <button type="submit" className="buttonstyle">
          GO FIND MARKETS!
        </button>
      </Link>
    </article>
  );
};
