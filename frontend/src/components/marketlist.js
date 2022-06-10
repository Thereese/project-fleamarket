import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/utils";
import { Market } from "./Market";

export const Marketlist = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8080/markets", options)
      .then((res) => res.json())
      .then((json) => setMarkets(json));
  }, []);

  // make a market component whick we can map over here instead?
  //fix the setLoading.. maksys inspelning

  return (
    <section>
      <h1>Flea markets in the area:</h1>
      <article>
        {markets.map((market) => (
          <Market key={market._id} market={market} />
        ))}
      </article>
    </section>
  );
};
