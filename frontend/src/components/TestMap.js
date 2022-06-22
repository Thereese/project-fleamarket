import {
  React,
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
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

// import "@reach/combobox/styles.css";

const center = { lat: 59.3014, lng: 18.0061 };

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

  // run me when selected change
  // useEffect(() => {
  // run function from prop
  // this function comes from TestMap
  //   updateFromMap(selected);
  // }, [selected]);
  const autocompleteSelect = (value) => {
    setSelected(value);
    updateFromMap(value);
    console.log(value);
  };

  return (
    <>
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
    </>
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
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      //   async (address) => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
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
    // <div ref={ref}>
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        // placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

//USING https://www.youtube.com/watch?v=BL2XVTqz9Ek
