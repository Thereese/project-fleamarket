import { React, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyles from "mapStyles";

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "300px" };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

export const TestMap = ({ updateFromMap }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading..</div>;
  return <Map updateFromMap={updateFromMap} />;
};

const Map = ({ updateFromMap }) => {
  const center = { lat: 59.3014, lng: 18.0061 };
  const [selected, setSelected] = useState(null);

  const autocompleteSelect = (value) => {
    setSelected(value);
    updateFromMap(value);
  };

  return (
    <article>
      <div className="places-container">
        <PlacesAutocomplete setSelected={autocompleteSelect} />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </article>
  );
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
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
      <label htmlFor="location">Location</label>
      <input
        value={value}
        id="location"
        onChange={handleInput}
        disabled={!ready}
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
