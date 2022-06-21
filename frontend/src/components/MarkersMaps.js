import { React, useCallback, useState, useRef } from "react";
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

export const MarkersMap = ({ marker }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  console.log(process.env);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <div className="mapbox">
      <h3 className="floatText">Markets</h3>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={mapContainerStyle}
        options={options}
        // onClick={onMapClick}
        // onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.lat}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
