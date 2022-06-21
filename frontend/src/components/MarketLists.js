import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "utils/utils";

import { Market } from "./Markets";
import { Map } from "./Maps";

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
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
// } from "@reach/combobox";
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

export const Marketlist = () => {
  const [markets, setMarkets] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  console.log(markets, "markets i state");
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
    <section>
      <h2>Find market</h2>
      <div className="mapbox">
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onLoad={onMapLoad}
        >
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
                      // position={{ lat: selected.lat, lng: selected.lng }}
                      onCloseClick={() => {
                        setSelected(null);
                      }}
                    >
                      <div className="info-window">
                        <h2>{name}</h2>
                        <h3>{date}</h3>
                        <h3>{starttime}</h3>
                        <h3>{endtime}</h3>
                        <h3>{description}</h3>
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
        <Link to="/addmarket">
          <button className="buttonstyle">Add new market</button>
        </Link>
      </div>
      <article>
        {markets.map((market) => (
          <Market key={market._id} market={market} />
        ))}
      </article>
    </section>
  );
};
const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
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
      <img src="https://via.placeholder.com/40" alt="compass - locate me" />
    </button>
  );
};

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 59.3014, lng: () => 18.0061 },
      radius: 20 * 1000,
    },
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = (suggestion) => () => {
    //   async (address) => {
    setValue(suggestion.description);
    clearSuggestions();

    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      panTo({ lat, lng });
      console.log("📍 Coordinates: ", { lat, lng });
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
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

//BELOW: WORKING CODE FOR COMBOBOX FROM THIS MORNING//

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { API_URL } from "utils/utils";

// import { Market } from "./Markets";
// import { Map } from "./Maps";

///MAPPEN
// import {
//   GoogleMap,
//   Marker,
//   useLoadScript,
//   InfoWindow,
// } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import mapStyles from "mapStyles";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// const center = { lat: 59.3014, lng: 18.0061 };

// const libraries = ["places"];
// const mapContainerStyle = { width: "100%", height: "300px" };

// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
//   fullscreenControl: true,
// };

// export const Marketlist = () => {
//   const [markets, setMarkets] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const mapRef = useRef();

//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   console.log(markets, "markets i state");
//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
// fetch("http://localhost:8080/markets", options)
//   fetch(API_URL("markets"), options)
//     .then((res) => res.json())
//     .then((json) => setMarkets(json));
// }, []);

// const { isLoaded, loadError } = useLoadScript({
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   libraries,
// });

// const panTo = useCallback(({ lat, lng }) => {
//   mapRef.current.panTo({ lat, lng });
//   mapRef.current.setZoom(15);
// }, []);

// if (loadError) {
//   return "Error loading maps";
// }
// if (!isLoaded) {
//   return "Loading Maps";
// }

// return (
//   <section>
//     <h2>Search for markets</h2>
//     <div className="mapbox">
//       <Search panTo={panTo} />
//       <Locate panTo={panTo} />
//       <GoogleMap
//         center={center}
//         zoom={15}
//         mapContainerStyle={mapContainerStyle}
//         options={options}
//         onLoad={onMapLoad}
//       >
// {markets.map(
//   ({
//     _id,
//     location,
//     name,
//     date,
//     starttime,
//     endtime,
//     description,
//   }) => {
//     const isSelected = selected === _id;
//     return (
//       <Marker
//         key={_id}
//         position={{
//           lat: location.lat,
//           lng: location.lng,
//         }}
//         onClick={() => {
//           setSelected(_id);
//         }}
//       >
// {isSelected ? (
//   <InfoWindow
//     // position={{ lat: selected.lat, lng: selected.lng }}
//     onCloseClick={() => {
//       setSelected(null);
//     }}
//   >
//                 <div className="info-window">
//                   <h2>{name}</h2>
//                   <h3>{date}</h3>
//                   <h3>{starttime}</h3>
//                   <h3>{endtime}</h3>
//                   <h3>{description}</h3>
//                 </div>
//               </InfoWindow>
//             ) : null}
//           </Marker>
//         );
//       }
//     )}
//   </GoogleMap>
// </div>
//       <div>
//         <Link to="/addmarket">
//           <button className="buttonstyle">Add new market</button>
//         </Link>
//       </div>
//       <article>
//         {markets.map((market) => (
//           <Market key={market._id} market={market} />
//         ))}
//       </article>
//     </section>
//   );
// };
// function Locate({ panTo }) {
//   return (
//     <button
//       className="locate"
//       onClick={() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             panTo({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           () => null
//         );
//       }}
//     >
//       <img src="https://via.placeholder.com/40" alt="compass - locate me" />
//     </button>
//   );
// }

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 59.3014, lng: () => 18.0061 },
//       radius: 20 * 1000,
//     },
//   });

// return (
//   <div className="search">
//     <Combobox
//       className="searchinput"
//       onSelect={async (address) => {
//         setValue(address, false);
//         clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("error");
//     }
//   }}
// >
//         <ComboboxInput
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           disabled={!ready}
//           placeholder="Enter an address"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ place_id, description }) => (
//                 <ComboboxOption key={place_id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }

//fix the setLoading
//return map of markets depending on how its filtered, either all or an area
