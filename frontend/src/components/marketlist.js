import React, { useState, useEffect } from "react";
// import { API_URL } from "../utils/utils";
import { Market } from "./Market";
import { Map } from "./Map";

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

  //fix the setLoading.. maksys inspelning
  //return map of markets depending on how its filtered, either all or an area
  //filter on date//Stretchgoal

  return (
    <section>
      <Map />
      <article>
        {markets.map((market) => (
          <Market key={market._id} market={market} />
        ))}
      </article>
    </section>
  );
};
