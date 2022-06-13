import { React } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const center = { lat: 59.3014, lng: 18.0061 };

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyAwin4yXdVBRKKzNIq5Tdi2Oyc3fTMVLwo",
  });

  if (!isLoaded) {
    return <p>loadingggg</p>;
  }

  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "300px" }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
