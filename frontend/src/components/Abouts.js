import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <h1>About "Finding Fleamarkets"</h1>
      <p>
        To live more sustainable and circular is something more and more people
        do. The amount of flea markets is getting bigger and bigger. This is an
        application to help people find and/or add flea market in a chosen area.
      </p>
      <Link to="/">Startpage</Link>
    </>
  );
};
