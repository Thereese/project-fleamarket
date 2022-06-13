import { React } from "react";
import { Link } from "react-router-dom";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { Map } from "./Map";

const center = { lat: 48.8584, lng: 2.2945 };

export const Search = () => {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyAwin4yXdVBRKKzNIq5Tdi2Oyc3fTMVLwo",
  // });

  // if (!isLoaded) {
  //   return <p>loadingggg</p>;
  // }

  return (
    <>
      <p>
        <Link to="/marketlist">Show all markets</Link>
      </p>
      <p>or</p>
      <p>Select area on map</p>
      <Map />
      {/* <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "300px" }}
      ></GoogleMap> */}
      <p>
        <Link to="/addmarket">add market</Link>
      </p>
    </>
  );
};
