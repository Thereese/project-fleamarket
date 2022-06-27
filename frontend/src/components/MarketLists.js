import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import { RiCompassDiscoverFill } from "react-icons/ri";

import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyles from "mapStyles";

const center = { lat: 59.3014, lng: 18.0061 };

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "300px" };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

export const Marketlist = () => {
  const [markets, setMarkets] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <section className="userinput-box">
      <h2>Find market</h2>
      <div className="mapbox">
        <Search panTo={panTo} />
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onLoad={onMapLoad}
        >
          <Locate panTo={panTo} />
          {markets.map(
            ({
              _id,
              location,
              name,
              date,
              starttime,
              endtime,
              description,
            }) => {
              const isSelected = selected === _id;
              console.log(location, "adressen");
              return (
                <Marker
                  key={_id}
                  position={{
                    lat: location.lat,
                    lng: location.lng,
                  }}
                  onClick={() => {
                    setSelected(_id);
                  }}
                >
                  {isSelected ? (
                    <InfoWindow
                      onCloseClick={() => {
                        setSelected(null);
                      }}
                    >
                      <div className="info-window">
                        <h3>{name}</h3>
                        {/* <p>{location}</p> */}
                        <p>When? {date}</p>
                        <p>What time? {starttime}</p>
                        <p>Ends at: {endtime}</p>
                        <p>{description}</p>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            }
          )}
        </GoogleMap>
      </div>
      <div>
        <Link to="/login">
          <button className="buttonstyle">ADD NEW MARKET</button>
        </Link>
      </div>

      {/* <article>
        {markets.map((market) => (
          <Market key={market._id} market={market} />
        ))}
      </article> */}
    </section>
  );
};
const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      aria-labelledby="button-label"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <span id="button-label" hidden>
        Compass - locate me
      </span>
      <RiCompassDiscoverFill aria-hidden="true" focusable="false" />
    </button>
  );
};

const Search = ({ panTo }) => {
  const {
    ready,
    value,

    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 59.3014, lng: () => 18.0061 },
      radius: 20 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion) => () => {
    setValue(suggestion.description, false);
    clearSuggestions();

    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      panTo({ lat, lng });
    });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search with address"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
