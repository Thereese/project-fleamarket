import { React } from "react";
import { Link } from "react-router-dom";

export const Search = () => {
  return (
    <>
      <h1>Search markets</h1>
      <h2>Map to pin location and search</h2>
      <p>
        If the user wants to add a market, send to{" "}
        <Link to="/addmarket">add market</Link>
      </p>
      ;
    </>
  );
};
