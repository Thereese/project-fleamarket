import React from "react";

export const Addmarket = () => {
  return (
    <>
      <h1>Here the form for adding a Market will be shown</h1>
      <section className="box">
        <h1>Test for add-section</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="date">When does it take place?</label>
        <input
          type="date"
          id="date"
          onChange={(event) => {
            console.log(event);
          }}
        />
        <label htmlFor="opens">Opens</label>
        <input type="time" id="opens" />
        <label htmlFor="closes">Closes</label>
        <input type="time" id="closes" />
        <label htmlFor="location">Location</label>
        <input type="text" id="location" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" />
        <button type="submit">Add market</button>
      </section>
      ;
    </>
  );
};
