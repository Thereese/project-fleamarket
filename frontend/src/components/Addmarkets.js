import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { getCookie } from "utils/cookieHelper";
import { TestMap } from "./TestMap";
import { API_URL } from "utils/utils";

export const Addmarket = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [opens, setOpens] = useState("");
  const [closes, setCloses] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdded, setIsadded] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const accessToken = getCookie("accessToken");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onDateChange = (event) => {
    setDate(event.target.value);
  };
  const onOpensChange = (event) => {
    setOpens(event.target.value);
  };
  const onClosesChange = (event) => {
    setCloses(event.target.value);
  };
  const onLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name,
        date: date,
        starttime: opens,
        endtime: closes,
        location: location,
        description: description,
      }),
    };

    fetch(API_URL("markets"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getCookie("accessToken", data.accessToken);
          setIsadded(true);
        } else {
          setError(data.response);
        }
      });
  };

  const updateFromMap = (selectedLocation) => {
    console.log({ locationFromMap: selectedLocation });
    setLocation(selectedLocation);
  };

  if (isAdded) {
    return <Navigate to="/confirmedadd" />;
  }

  return (
    <article>
      <h1>Add a flea market</h1>
      <form onSubmit={onFormSubmit}>
        {/* <form onSubmit={onFormSubmit}> */}
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={onNameChange} />
        <label htmlFor="date">When does it take place?</label>
        <input type="date" id="date" value={date} onChange={onDateChange} />
        <label htmlFor="opens">Opens</label>
        <input type="time" id="opens" value={opens} onChange={onOpensChange} />
        <label htmlFor="closes">Closes</label>
        <input
          type="time"
          id="closes"
          value={closes}
          onChange={onClosesChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={onDescriptionChange}
        />

        <label htmlFor="location">Location</label>
        <TestMap updateFromMap={updateFromMap} />
        <Link to="/Login">
          <p>{error}</p>
        </Link>
        <button type="submit" className="buttonstyle" onClick={onFormSubmit}>
          ADD MARKET
        </button>
      </form>
    </article>
  );
};
