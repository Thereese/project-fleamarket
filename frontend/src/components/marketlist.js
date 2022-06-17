import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "utils/utils";

import { Market } from "./Market";
import { Map } from "./Map";

///MAPPEN
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
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
  // const [markers, setMarkers] = useState([]);

  const mapRef = useRef();

  console.log(markets);
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
  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <section>
      <div className="mapbox">
        <h3 className="floatText">Markets</h3>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          options={options}
        >
          {markets.map((market) => {
            <Marker
              key={market._id}
              const
              position={{ lat: market.location.lat, lng: market.location.lng }}
            />;
          })}
        </GoogleMap>
      </div>

      <article>
        {/* {markets.map((market) => (
          <>
            <Market key={market._id} market={market} />
          </>
        ))} */}
      </article>
      <div>
        <p>Select area on map</p>
        <Link to="/addmarket">add market</Link>
      </div>
    </section>
  );
};

//fix the setLoading
//return map of markets depending on how its filtered, either all or an area
