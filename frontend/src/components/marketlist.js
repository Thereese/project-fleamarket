import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/utils";

export const Marketlist = () => {
  const [markets, setMarkets] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL("markets"), options)
      .then((res) => res.json())
      .then((json) => setMarkets(json));
  }, []);

  //make a market component whick we can map over here instead?

  return (
    <div>
      <h1>Fleamarkets!</h1>
      {markets.map((market) => (
        <div key={market._id}>
          <h2>{market.name}</h2>
          <h3>{market.date}</h3>
          <h3>
            {market.starttime} to
            {market.endtime}
          </h3>
          <p>{market.description}</p>
        </div>
      ))}
    </div>
  );
};
