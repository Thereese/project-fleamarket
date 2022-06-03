import { React } from "react";
import { Link } from "react-router-dom";

export const Search = () => {
  return (
    <>
      <h1>Here the form for search markets will be shown</h1>;
      <p>
        If the user wants to add a market, send to{" "}
        <Link to="/addmarket">add market</Link>
      </p>
      ;
    </>
  );
};
