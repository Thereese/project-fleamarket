import React, { useState } from "react";

export const App = () => {
  return (
    <section className="box">
      <h1>Test for add-section</h1>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
      <label htmlFor="date">When does it take place?</label>
      <input type="date" id="date" />
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
    //dont have an account? sign up here! (link to register)
  );
};
