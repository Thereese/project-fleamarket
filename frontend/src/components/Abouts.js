import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <h1>About "Finding Fleamarkets"</h1>
      <p>
        More and more people understand the importance of living in a more
        sustainable way. Also what responsibility we have to take care of this
        planet and all it´s inhabitants. <br /> One way of approaching this is
        to change our consumer behaviuor to a more circular one. Flea markets
        are a great way of both selling and buying pre-loved things. With this
        app I wan´t to make it easier to search for markets and to add your own.
      </p>
      <p>maybe this text can help</p>
      <Link to="/">
        <button type="submit" className="buttonstyle">
          FIND MARKETS!
        </button>
      </Link>
    </>
  );
};
