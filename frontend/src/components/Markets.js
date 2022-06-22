import React from "react";

export const Market = ({ market }) => {
  return (
    <article className="market-box">
      <h2>{market.name}</h2>
      <h3>{market.date}</h3>
      <h3>
        {market.starttime} to
        {market.endtime}
      </h3>
      <p>{market.description}</p>
    </article>
  );
};
